"use client";

import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import React from 'react'

const ContactPage = () => {
 const data = useQuery(api.contacts.getAllContacts);
 console.log(data);
    return (
    <div>
      ContactPage
    </div>
  )
}

export default ContactPage
