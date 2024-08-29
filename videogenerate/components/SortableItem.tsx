import { useSortable } from "@dnd-kit/sortable";
import { FC, useState } from "react";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  id: number;
  name?: string;
  content?: string;
};



export const SortableItem: FC<Props> = ({ id, content }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });

  const [state, setState] = useState(content);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div>
        {/* <div>{content}</div> */}
        <input
          type="text"
          value={content}
          className="w-full"
          onChange={(e) => setState(e.target.value)}/>
      </div>
    </div>
  );
};
