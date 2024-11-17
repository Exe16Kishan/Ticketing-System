"use client"

import { allTicket } from "@/app/actions/bookTicket"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { CalendarIcon, MapPinIcon, TicketIcon } from "lucide-react"

interface Ticket {
  id: string
  event?: {
    title: string
    date?: Date
    location?: string
  }
}

export default function TicketsPage({ params }: { params: { userId: string } }) {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchTickets = async () => {
      setIsLoading(true)
      const response = await allTicket(params.userId)
      if (response.success) {
        setTickets(response.tickets)
      }
      setIsLoading(false)
    }
    fetchTickets()
  }, [params.userId])

  const handleClick = (ticketId: string) => {
    router.push(`/ticket/${ticketId}`)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Tickets</h1>
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-2/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : tickets.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <Card
              key={ticket.id}
              className="overflow-hidden transition-all hover:shadow-lg"
            >
              <CardHeader className="pb-2">
                <CardTitle>{ticket.event?.title || "Unnamed Event"}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                {ticket.event?.date && (
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {new Date(ticket.event.date).toLocaleDateString()}
                  </div>
                )}
                {ticket.event?.location && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPinIcon className="mr-2 h-4 w-4" />
                    {ticket.event.location}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full hover:bg-gray-200"
                  onClick={() => handleClick(ticket.id)}
                >
                  <TicketIcon className="mr-2 h-4 w-4" />
                  View Ticket
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-6 text-center">
          <CardContent>
            <TicketIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Tickets Found</h2>
            <p className="text-muted-foreground">
              You haven't purchased any tickets yet. Check out our events page to find something exciting!
            </p>
          </CardContent>
          <CardFooter className="justify-center">
            <Button onClick={() => router.push('/')}>Browse Events</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}