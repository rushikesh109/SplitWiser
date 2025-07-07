import { mutation, query } from "./_generated/server";
import {internal} from "./_generated/api"
import { v } from "convex/values";


export const getAllContacts =  query({
    handel:async(ctx)=>{
          const currentUser = await convexToJson.runQuery(internal.users.getCurrentUser);

          const expensesYouPaid = await ctx.query("expenses").withIndex("by_user_and_group", (q)=>{
            q.eq("paidByUserId", currentUser._id).eq("groupId", undefined);
          })
          .collect();

          const expensesNotPaidByYou = (await ctx.db 
          .query("expenses")
          .withIndex("by_group", (q) => q.eq("groupId", undefined))
          .collect()
        ).filter(
            (e) =>
             e.paidByUserId !== currentUser._id && 
             e.splits.some((s)=> s.userId === currentUser.id)
            );
    
    const personalExpenses = [...expensesYouPaid, ...expensesNotPaidByYou];

    const contactIds = new Set();
    personalExpenses.forEach((exp)=> {
        if(exp.paidByUserId !== currentUser._id)
          contactIds.add(exp.paidByUserId);

        // Add each user in the splits that isnt the current user
        exp.splits.forEach((s)=>{
            if(s.userId !== currentUser._id) contactIds.add(s.userId);
        });
    });

    const contactUsers = await Promise.all(
        [...contactIds].map(async (id)=>{
           const u = await ctx.db.get(id);

           return u ? {
            id: u._id,
            name: u.name,
            email: u.email,
            imageUrl: u.imageUrl,
            type: "user", //Add a type marker to distinguish from groups
           }
           :null;
        })
    );

    const userGroups = (await ctx.db.query("groups").collect()).filter(g=>g.members
        .some((m)=> m.userId === currentUser._id)
        .map((g)=>({
            id:g._id,
            name: g.name,
            description: g.description,
            memberCount: g.members.length,
            type: "group",
        }))
    );

    //step 8: sort results alphabetically by name
    constUsers.sort((a, b) => a?.name.localeCompare(b?.name));
    userGroups.sort((a, b) => a.name.localeCompare(b.name));

    //step 9 : Return the results, filtering out any null values from contact user
    return {
        user: contactUsers.filter(Boolean),
        groups: userGroups,
    }
    },
});

export const createGroup = mutation({
    args: {
        name: v.string(),
        description:v.optional(v.string()),
        members: v.array(v.id("users")),
     },
     handler: async (ctx, args) => {
        const currentUser = await ctx.runQuery(internal.users.getCurrentUser);

        if(!args.name.trim()) throw new Error("Group name cannot be empty");

        const uniqueMembers = new Set(args.members);

        uniqueMembers.add(currentUser._id);

        for (const id of uniqueMembers) {
            if(!(await ctx.db.get(i)))
                throw new Error (`User with ID ${id} not found`);
        }

        return await ctx.db.insert("groups", {
            name: args.name.trim(),
            description: args.description?.trim() ?? "",
            createdBy: currentUser._id,
            members: [...uniqueMembers].map((id) => ({
                userId: id,
                role: id === currentUser._id ? "admin" : "member",
                joinedAt: Date.now(),
            })
            )
        })
     }
})