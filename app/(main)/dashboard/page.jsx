"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { ChevronRight, PlusCircle } from "lucide-react";
import Link from "next/link";
import React, { useMemo } from "react";
import { BarLoader } from "react-spinners";
import { BalanceSummary } from "./components/balance-summary";
import { ExpenseSummary } from "./components/expense-summary";
import { GroupList } from "./components/group-list";

/** Small reusable card */
const StatCard = ({ title, amount, color = "text-black", note }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className={`text-2xl font-bold ${color}`}>{amount}</div>
      {note && <p className="text-xs text-muted-foreground mt-1">{note}</p>}
    </CardContent>
  </Card>
);

const DashboardPage = () => {
  const { data: balances, isLoading: balancesLoading } = useConvexQuery(api.dashboard.getUserBalances);
  const { data: groups, isLoading: groupLoading } = useConvexQuery(api.dashboard.getUserGroups);
  const { data: totalSpent, isLoading: totalSpentLoading } = useConvexQuery(api.dashboard.getTotalSpent);
  const { data: monthlySpending, isLoading: monthlySpendingLoading } = useConvexQuery(api.dashboard.getMonthlySpending);

  const isLoading = useMemo(
    () => balancesLoading || groupLoading || totalSpentLoading || monthlySpendingLoading,
    [balancesLoading, groupLoading, totalSpentLoading, monthlySpendingLoading]
  );

  if (isLoading) {
    return (
      <div className="w-full py-12 flex justify-center">
        <BarLoader width="100%" color="#36d7b7" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-5xl gradient-title">Dashboard</h1>
        <Button asChild>
          <Link href="/expenses/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Expense
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Total Balance"
          amount={
            balances?.totalBalance > 0
              ? `+$${balances.totalBalance.toFixed(2)}`
              : balances?.totalBalance < 0
              ? `-$${Math.abs(balances.totalBalance).toFixed(2)}`
              : "$0.00"
          }
          color={
            balances?.totalBalance > 0
              ? "text-green-600"
              : balances?.totalBalance < 0
              ? "text-red-600"
              : "text-black"
          }
          note={
            balances?.totalBalance > 0
              ? "You are owed money"
              : balances?.totalBalance < 0
              ? "You owe money"
              : "All settled up!"
          }
        />

        <StatCard
          title="You are owed"
          amount={`$${balances?.youAreOwed.toFixed(2)}`}
          color="text-green-600"
          note={`From ${balances?.oweDetails?.youAreOwedBy?.length || 0} people`}
        />

        <StatCard
          title="You owe"
          amount={
            (balances?.oweDetails?.youOwe?.length ?? 0) > 0
              ? `$${balances.youOwe.toFixed(2)}`
              : "$0.00"
          }
          color={(balances?.oweDetails?.youOwe?.length ?? 0) > 0 ? "text-red-600" : "text-black"}
          note={
            (balances?.oweDetails?.youOwe?.length ?? 0) > 0
              ? `To ${balances.oweDetails.youOwe.length} people`
              : "You don't owe anyone"
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Expense summary */}
        <div className="lg:col-span-2 space-y-6">
          <ExpenseSummary monthlySpending={monthlySpending} totalSpent={totalSpent} />
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Balance Details Card */}
          <Card>
            <CardHeader className="pb-3 flex items-center justify-between">
              <CardTitle>Balance Details</CardTitle>
              <Button variant="link" asChild className="p-0">
                <Link href="/contacts">
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <BalanceSummary balances={balances} />
            </CardContent>
          </Card>

          {/* Groups Card */}
          <Card>
            <CardHeader className="pb-3 flex items-center justify-between">
              <CardTitle>Your Groups</CardTitle>
              <Button variant="link" asChild className="p-0">
                <Link href="/contacts">
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <GroupList groups={groups} />
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/contacts?createGroup=true">Create new group</Link>
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
