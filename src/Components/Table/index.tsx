import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import styles from './index.module.scss';

const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "username", headerName: "Username" },
    { field: "date", headerName: "Date" },
    { field: "category", headerName: "Category" },
    { field: "dataUsed", headerName: "Data Used (in GB)" },
];

export interface TableCell {
    id: number;
    username: string;
    date: string;
    category: string;
    dataUsed: string;
}

const DataTable = ({ rows }: {rows: object[]}) => {
    return (
        <div className="flex flex-col items-center">
            <div
                className={styles.tableData}
                style={{ height: 400, width: "85vw" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </div>
        </div>
    );
}

export default DataTable;
