import React from "react";
import ItemsHubData from ".";

export default function TaskListSections({ data }: any) {
  return (
    <section id="listcard" className="  bg-white " key={data.id}>
      <div
        className="block  m-1 rounded"
        style={{ backgroundColor: "#e1e4e5" }}
      >
        <div className=" capitalize ">
          <ItemsHubData hubId={data.id} hubName={data.name} />
        </div>

        {/* card */}

        {/* endshere */}
      </div>
    </section>
  );
}
