'use client'

export default function QuestionCard({ question, onDelete }) {
  const handleDelete = async () => {
    await fetch(`/api/questions/${question._id}`, { method: 'DELETE' })
    onDelete(question._id)
  }

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-semibold">{question.title}</h2>
      <p className="text-sm text-gray-500">Asked: {new Date(question.createdAt).toLocaleString()}</p>
      <button
        onClick={handleDelete}
        className="mt-2 text-red-600 hover:underline text-sm"
      >
        Delete
      </button>
    </div>
  )
}