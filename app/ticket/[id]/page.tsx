'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, MapPinIcon, UserIcon, ClockIcon, DownloadIcon } from 'lucide-react'
import Image from 'next/image'
import html2canvas from 'html2canvas'
import { ticketdata } from '@/app/actions/bookTicket'

interface TicketData {
    event: {
        price: number;
        title: string;
        location: string;
        date: Date;
        time: string;
    },
    user: {
        name: string | null;
    } | null;
}

export default function TicketPage({ params }:any ) {
  const [ticketData, setTicketData] = useState<TicketData | null>(null)
  const [qrCodeUrl, setqrCodeUrl] = useState<string | null>(null)
  const router = useRouter()
  useEffect(() => {
    const fetchTicketData = async () => {
      
      const data=await ticketdata(params.id) 
      if (data?.success) {
        setTicketData(data.ticket)
        setqrCodeUrl(data.qrCodeUrl)
      }
    }

    fetchTicketData()
  }, [params.id])

  const handleDownload = async () => {
    const ticketElement = document.getElementById('ticket')
    if (ticketElement) {
      const canvas = await html2canvas(ticketElement)
      const image = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = image
      link.download = `${ticketData?.event.title}-ticket.png`
      link.click()
    }
  }

  if (!ticketData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Card id="ticket" className="w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
          <h1 className="text-2xl font-bold text-center">{ticketData.event.title}</h1>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-center mb-6">
            <Image
              src={qrCodeUrl || ""}
              alt="Event QR Code"
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2 text-gray-500" />
              <span>{ticketData.event.date.toDateString()}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="w-5 h-5 mr-2 text-gray-500" />
              <span>{ticketData.event.time}</span>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="w-5 h-5 mr-2 text-gray-500" />
              <span>{ticketData.event?.location}</span>
            </div>
            <div className="flex items-center">
              <UserIcon className="w-5 h-5 mr-2 text-gray-500" />
              <span>{ticketData.user?.name}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-100 p-6 flex justify-between items-center">
          <Badge variant="secondary" className="text-sm">
            Quest
          </Badge>
          <span className="text-lg font-semibold">Rs {ticketData.event.price}</span>
        </CardFooter>
      </Card>
      <div className="mt-6 space-x-4">
        <Button onClick={handleDownload} className="flex items-center space-x-2">
          <DownloadIcon className="w-4 h-4" />
          <span>Download Ticket</span>
        </Button>
        <Button variant="outline" onClick={() => router.back()}>
          Back to Event
        </Button>
      </div>
    </div>
  )
}