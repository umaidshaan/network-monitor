import { AppDataContext } from "@/Contexts/AppData";
import { NetworkRecords, filteredNetworkData } from "@/pages/types";
import axios from "axios";
import dayjs from "dayjs";
import _ from "lodash";
import { useContext, useEffect, useState } from "react";

// Same as set in tailwind.config.cjs
const sm = 640;
const md = 768;
const lg = 1024;
const xl = 1280;

const useFetchData = () => {
    const { setData, selectedDate } = useContext(AppDataContext);
    const [newData, setNewData] = useState<filteredNetworkData>();

    const path = "http://localhost:3000/api/getData";

    const getData = async () => {
        const res = await axios(path, {
            params: {
                end: dayjs(selectedDate)
                    .add(1, "day")
                    .format("YYYY-MM-DD"),
                start: dayjs(selectedDate)
                    .subtract(7, "day")
                    .format("YYYY-MM-DD"),
            },
        });
        const batchFilteredArr = formatData(res.data.products);
        setData(batchFilteredArr);
        setNewData(batchFilteredArr);
        console.log(batchFilteredArr);
    };

    const formatData = (data: NetworkRecords[]) => {
        const filteredData: NetworkRecords[] = data.map((rec) => {
            return {
                ...rec,
                acctstarttime: dayjs(rec.acctstarttime).format("YYYY-MM-DD"),
            };
        });

        let batchFilteredArr: filteredNetworkData = {
            students: {},
            staff: {},
        };

        const students = filteredData.filter(
            (rec) => rec.username.slice(0, 2).toUpperCase() === "CS"
        );
        const staff = filteredData.filter(
            (rec) => rec.username.slice(0, 2).toUpperCase() != "CS"
        );

        staff.map((rec) => {
            if (batchFilteredArr?.staff?.[rec.acctstarttime]?.length) {
                batchFilteredArr?.staff[rec.acctstarttime]?.push({ ...rec });
            } else {
                _.extend(batchFilteredArr?.staff, {
                    [rec.acctstarttime]: new Array({
                        ...rec,
                    }),
                });
            }
        });

        students.map((record) => {
            if (
                batchFilteredArr?.students?.[record.acctstarttime] &&
                Object.keys(batchFilteredArr?.students?.[record.acctstarttime])
                    ?.length
            ) {
                if (
                    batchFilteredArr?.students[record.acctstarttime]?.[
                        record.username.slice(0, 4).toUpperCase()
                    ]?.length
                ) {
                    batchFilteredArr?.students[record.acctstarttime]?.[
                        record.username.slice(0, 4).toUpperCase()
                    ]?.push({ ...record });
                } else {
                    _.extend(batchFilteredArr?.students[record.acctstarttime], {
                        [record.username.slice(0, 4).toUpperCase()]: new Array({
                            ...record,
                        }),
                    });
                }
            } else {
                const newObj = {
                    [record.username.slice(0, 4).toUpperCase()]: record,
                };
                _.extend(batchFilteredArr?.students, {
                    [record.acctstarttime]: newObj,
                });
            }
        });

        return batchFilteredArr;
    };

    useEffect(() => {
        getData();
    }, [selectedDate]);

    return newData;
};

export default useFetchData;
