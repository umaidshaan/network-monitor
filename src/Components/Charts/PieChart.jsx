import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { mockPieData as data } from "../../data/mockData";

const PieChart = ({data}) => {
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

  let pieData = [];

  Object.keys(formattedData[0]).map((val) => {
    if (val === "date") {
      return;
    }
    let sum = 0;
    formattedData.map((record) => {
      sum += Number(record[val]);
    })
    pieData.push({
      id: val,
      label: val,
      value: sum.toFixed(2),
    })
  })

  console.log("formattedData", formattedData)
  console.log("pieData",pieData)

  return (
    <ResponsivePie
      data={pieData}
      theme={{
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
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
