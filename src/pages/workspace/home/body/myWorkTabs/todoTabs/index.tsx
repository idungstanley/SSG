import React from 'react';
import { todoTabs } from '../../homeDatas';

export default function TodoTabs() {
  return <div className="space-y-4 mt-5 text-black">{todoTabs.map((tab) => tab.node)}</div>;
}
