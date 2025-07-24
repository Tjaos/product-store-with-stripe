"use client";

import { useEffect, useState } from "react";
import { ref, push, onValue } from "firebase/database";
import { database } from "@/lib/firebase";
import { useSession } from "next-auth/react";

export default function CourseComments({ courseId }: { courseId: string }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<
    { id: string; text: string; user: string }[]
  >([]);

  useEffect(() => {
    const commentsRef = ref(database, `comments/${courseId}`);
    const unsubscribe = onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsed = Object.entries(data).map(([id, value]) => {
          const comment = value as { text: string; user: string };
          return {
            id,
            text: comment.text,
            user: comment.user,
          };
        });

        setComments(parsed);
      } else {
        setComments([]);
      }
    });

    return () => unsubscribe();
  }, [courseId]);

  const handleSend = async () => {
    if (!session) {
      alert("Você precisa estar logado para comentar");
      return;
    }
    if (!comment.trim()) return;

    const commentsRef = ref(database, `comments/${courseId}`);
    await push(commentsRef, {
      text: comment.trim(),
      user: session.user?.name || "Anônimo",
    });

    setComment("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="space-y-2 flex-1 overflow-y-auto max-h-[200px] mb-3">
        {comments.map((c) => (
          <div key={c.id} className="bg-gray-100 rounded-md p-2 break-words">
            <p className="text-sm">
              <strong>{c.user}:</strong> {c.text}
            </p>
          </div>
        ))}
      </div>

      {session ? (
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Escreva um comentário"
            className="flex-1 border px-3 py-2 rounded-md"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <button
            onClick={handleSend}
            className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Enviar
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-500">Faça login para comentar.</p>
      )}
    </div>
  );
}
