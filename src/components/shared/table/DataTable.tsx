import { useEffect } from "react";
import TopHeader from "./TopHeader";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./Table";


interface Column<T> {
    title: string;
    render: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
    title: string;
    description?: string;
    buttonTitle?: string;
    addPath: string;

    data: T[];
    columns: Column<T>[];

    isFetched: boolean;
    fetchData: () => void;
}

function DataTable<T>({
    title,
    description,
    buttonTitle,
    addPath,
    data,
    columns,
    isFetched,
    fetchData,
}: DataTableProps<T>) {
    useEffect(() => {
        if (!isFetched) fetchData();
    }, [isFetched, fetchData]);

    return (
        <div className="main">

            <TopHeader title={title || "title"}
                description={description || "descipriotn"}
                buttonTitle={buttonTitle || "Button Title"} buttonLink={addPath} />

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-700 ">
                <div className="max-w-full overflow-x-auto">

                    <Table>

                        {/* Head */}
                        <TableHeader className="border-b border-gray-100 text-center">
                            <TableRow>
                                {columns.map((col, i) => (
                                    <TableCell key={i} isHeader className="px-5 py-3">
                                        {col.title}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHeader>

                        {/* Body */}
                        <TableBody className="divide-y divide-gray-100 text-center">
                            {data.map((row, i) => (
                                <TableRow key={i}>
                                    {columns.map((col, j) => (
                                        <TableCell key={j} className="px-4 py-3">
                                            {col.render(row)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>

                </div>
            </div>
        </div>
    );
}

export default DataTable;
