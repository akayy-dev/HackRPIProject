import React, { useEffect } from "react";
import { LineChart } from "react-chartkick";
import "chartkick/chart.js";

const EmissionsTracker = () => {
  let data = { "Yesterday": 0,  "Today": 10, "Tomorrow": 5 };

	return (
		<div className="section">
			<h2>Emissions Options</h2>
			<p>Placeholder text for food options.</p>
      <LineChart data={data} />
		</div>
	);
};

export default EmissionsTracker;
