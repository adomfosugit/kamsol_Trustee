import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Props = {}

const Status = (props: Props) => {
  return (
    <Tabs defaultValue="active" >
  <TabsList>
    <TabsTrigger value="active">Active</TabsTrigger>
    <TabsTrigger value="closed">Closed</TabsTrigger>
    <TabsTrigger value="search">Search</TabsTrigger>
  </TabsList>

</Tabs>
  )
}

export default Status