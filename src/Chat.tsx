import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { TextResponse } from "@/api"
import { useSendMessageMutation } from "@/api"
import { ImageIcon, Smile, MoreHorizontal } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function Chat() {
  const { agentId } = useParams()
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<TextResponse[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { mutate: sendMessage, isPending } = useSendMessageMutation({ setMessages, setSelectedFile })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom]) // Added scrollToBottom to dependencies

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if ((!input.trim() && !selectedFile) || !agentId) return

    const userMessage: TextResponse = {
      text: input,
      user: "user",
      attachments: selectedFile
        ? [{ url: URL.createObjectURL(selectedFile), contentType: selectedFile.type, title: selectedFile.name }]
        : undefined,
    }
    setMessages((prev) => [...prev, userMessage])

    sendMessage({ text: input, agentId, selectedFile })
    setInput("")
    setSelectedFile(null)
  }

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file)
    }
  }

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <div className="border-b p-4 flex items-center justify-between bg-background shrink-0">
        <div className="flex items-center gap-3">
          <img src="/orius.png" alt="Orius Finance Logo" className="w-12 h-12 rounded-full object-cover" />
          <div>
            <h3 className="font-semibold">Orius Finance</h3>
            <span className="text-sm text-green-500">Online</span>
          </div>
        </div>
        <ConnectButton />
      </div>

      <div className="flex-1 overflow-y-auto p-4 w-full">
        <div className="space-y-6">
          {messages.length > 0 ? (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted-foreground/20"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-background px-2 text-sm text-muted-foreground">Today</span>
                </div>
              </div>

              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.user === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[80%]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{message.user === "user" ? "You" : "Orius Finance"}</span>
                    </div>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.user === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.text}</p>
                      {message.attachments?.map(
                        (attachment, i) =>
                          attachment.contentType.startsWith("image/") && (
                            <img
                              key={i}
                              src={
                                message.user === "user"
                                  ? attachment.url
                                  : attachment.url.startsWith("http")
                                    ? attachment.url
                                    : `http://138.197.187.21:3000/media/generated/${attachment.url.split("/").pop()}`
                              }
                              alt={attachment.title || "Attached image"}
                              className="mt-2 max-w-full rounded-lg"
                            />
                          ),
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="text-center text-muted-foreground">No messages yet. Start a conversation!</div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t p-4 bg-background shrink-0">
        <div className="w-full">
          <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 rounded-md border shadow-sm">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Send a message"
              className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-2 h-11"
              disabled={isPending}
            />
            <div className="flex items-center gap-1.5">
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={handleFileSelect}
                disabled={isPending}
              >
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Smile className="h-5 w-5" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
              <Button
                type="submit"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-6 py-2"
                disabled={isPending}
              >
                {isPending ? "..." : "Send"}
              </Button>
            </div>
          </form>
          {selectedFile && (
            <div className="mt-2 text-sm text-muted-foreground px-4">Selected file: {selectedFile.name}</div>
          )}
        </div>
      </div>
    </div>
  )
}

