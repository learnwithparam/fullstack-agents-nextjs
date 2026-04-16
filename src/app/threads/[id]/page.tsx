import { db } from '@/db/client';
import { messages as messagesTable } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { ChatPanel } from '@/components/chat/chat-panel';

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rows = await db
    .select()
    .from(messagesTable)
    .where(eq(messagesTable.threadId, id))
    .orderBy(asc(messagesTable.createdAt));

  const initialMessages = rows.map((r) => ({
    id: r.id,
    role: r.role as 'user' | 'assistant' | 'system',
    parts: r.parts as { type: string }[],
  }));

  return <ChatPanel threadId={id} initialMessages={initialMessages} />;
}
