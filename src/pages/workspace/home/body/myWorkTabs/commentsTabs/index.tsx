import React from 'react';
import AllDoneForTheDay from '../AllDoneForTheDay';

export default function CommentsTabs() {
  return (
    <div className="mt-5">
      <AllDoneForTheDay
        allDoneState={true}
        title="Woohoo, youre all done!"
        description="You have no assigned comments"
      />
    </div>
  );
}
