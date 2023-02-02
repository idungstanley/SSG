import React from "react";
import ItemsHubData from ".";

export default function TaskListSections({ data }: any) {
  return (
    <section id="listcard" className="  bg-white " key={data.id}>
      <div className="block  bg-gray-100 m-1 rounded">
        <div className=" capitalize ">
          <ItemsHubData hubId={data.id} hubName={data.name} />
        </div>

        {/* card */}

        {/* endshere */}
      </div>
    </section>
  );
}
