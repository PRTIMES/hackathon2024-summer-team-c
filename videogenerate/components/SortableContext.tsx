import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import "./styles.css";
import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import { SortableItem } from "@/components/SortableItem";
// import { SortableItemProp } from "./type/sortable";

const INITIAL_ITEMS = [
  { id: crypto.randomUUID(), name: "ソータブルアイテム　A" },
  { id: crypto.randomUUID(), name: "ソータブルアイテム　B" },
  { id: crypto.randomUUID(), name: "ソータブルアイテム　C" },
  { id: crypto.randomUUID(), name: "ソータブルアイテム　D" },
  { id: crypto.randomUUID(), name: "ソータブルアイテム　E" },
];

export default function App() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  return (
    <div className="App">
      <div>
        <div>
          <DndContext
            onDragEnd={(event) => {
              const { active, over } = event;
              if (over == null) {
                return;
              }
              if (active.id !== over.id) {
                setItems((items) => {
                  const oldIndex = items.findIndex(
                    (item) => item.id === active.id
                  );
                  const newIndex = items.findIndex(
                    (item) => item.id === over.id
                  );
                  return arrayMove(items, oldIndex, newIndex);
                });
              }
            }}
          >
            <SortableContext items={items}>
              <div>
                {items.map((item) => (
                  <SortableItem id={item.id} name={item.name} key={item.id} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
