'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, Send, User, Bot, Loader2, X, MessageCircle } from 'lucide-react';
import { askAiTeacher } from '@/ai/flows/ai-teacher-flow';
import { cn } from '@/lib/utils';

type Message = {
  role: 'user' | 'model';
  text: string;
};

export default function AiTeacherChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        content: [{ text: m.text }]
      }));

      const response = await askAiTeacher({
        message: userMessage,
        history: history
      });

      setMessages((prev) => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'model', text: "I'm sorry, I encountered an error. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl z-50 transition-all duration-300",
          isOpen ? "bg-destructive hover:bg-destructive/90 rotate-90" : "bg-primary hover:bg-primary/90"
        )}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-[400px] h-[600px] z-50 flex flex-col shadow-2xl border-primary/20 animate-in slide-in-from-bottom-4 duration-300 bg-slate-950 text-slate-200 overflow-hidden">
          <CardHeader className="bg-primary py-4 px-6 shrink-0">
            <CardTitle className="text-white flex items-center gap-3 text-sm font-headline tracking-widest uppercase">
              <div className="bg-white/20 p-1.5 rounded-lg">
                <Sparkles className="h-4 w-4" />
              </div>
              Virtual AI Teacher
            </CardTitle>
            <p className="text-[10px] text-white/70 font-bold">Deepak Kumar (Robotics & AI)</p>
          </CardHeader>

          <CardContent className="flex-1 overflow-hidden p-0 bg-slate-900/50">
            <ScrollArea className="h-full p-4" viewportRef={scrollRef}>
              <div className="space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-10 space-y-4">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto border border-primary/20">
                      <Bot className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-slate-300">HWHS Academic Support</p>
                      <p className="text-xs text-slate-500 max-w-[200px] mx-auto">
                        Ask me about Coding, mental health, or any school subjects.
                      </p>
                    </div>
                  </div>
                )}
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex gap-3 max-w-[85%]",
                      msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                    )}
                  >
                    <div className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center shrink-0 border",
                      msg.role === 'user' ? "bg-slate-800 border-slate-700" : "bg-primary/20 border-primary/30"
                    )}>
                      {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-primary" />}
                    </div>
                    <div className={cn(
                      "p-3 rounded-2xl text-sm leading-relaxed",
                      msg.role === 'user' 
                        ? "bg-slate-800 text-slate-100 rounded-tr-none" 
                        : "bg-slate-950 border border-slate-800 text-slate-300 rounded-tl-none"
                    )}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 mr-auto max-w-[85%]">
                    <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                      <Loader2 className="h-4 w-4 text-primary animate-spin" />
                    </div>
                    <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl rounded-tl-none">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-4 bg-slate-950 border-t border-slate-800 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex w-full gap-2"
            >
              <Input
                placeholder="Ask your teacher..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="bg-slate-900 border-slate-800 text-slate-200 focus-visible:ring-primary h-10"
              />
              <Button size="icon" type="submit" disabled={!input.trim() || isLoading} className="shrink-0 bg-primary hover:bg-primary/90 h-10 w-10">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
