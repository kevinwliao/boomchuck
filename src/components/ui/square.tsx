import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Square({
  id,
  children,
}: {
  id: number;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      className="rounded-xl border border-slate-200 bg-stone-200 p-10 text-center"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      id={`${id}`}
      key={id}
    >
      {children}
    </div>
  );
}
