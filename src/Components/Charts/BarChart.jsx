import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../theme";
import { mockBarData as data } from "../../data/mockData";
import { filteredNetworkData } from "@/pages/types";
import _ from "lodash";
import dayjs from "dayjs";


const BarChart = ({ data , isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let formattedData = [];

  Object.keys(data.students).map((key) => {
    formattedData.push({
      date: key,
      STAFF: 0,
    });
  });

  
  formattedData.map((ob) => {
    Object.keys(data.students[Object.keys(data.students)[0]]).map((keys) => {
      _.extend(ob, {
        [keys]: 0
      });
    })
  });


  // Data usage by STAFF
  formattedData = formattedData.map((ob) => {
    let sum = 0;
    data.staff[ob.date].map((dataUsed) => {
      sum += Number(dataUsed.total_octates_used);
    })

    ob.STAFF = sum.toFixed(2);

    return ob;
  });


  formattedData = formattedData.map((ob) => {
    
    Object.keys(ob).map((items) => {

      if (items === "STAFF" || items === "date") {
        return;
      }

      let sum = 0;

      data.students[ob.date][items].map((dataUsed) => {
        sum += Number(dataUsed.total_octates_used);
      })

      ob[items] = sum.toFixed(2);
    })

    return ob;
  });

  formattedData = formattedData.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  if(formattedData.length)
  return (
    <ResponsiveBar
      data={formattedData}
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
            // wordWrap: "break-word"
          },
        },
      }}
      keys={["STAFF", ...Object.keys(formattedData[0]).filter((key)=>key.slice(0,2) === "CS")]}
      indexBy="date"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Date", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Data used in GB", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
    );
  
  return <></>;
};

export default BarChart;
