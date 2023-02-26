import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Grid, Paper } from '@material-ui/core';



class TableSchema {
    name: string = "";
    columns: {
        cname: string;
        ctyp: string;
    }[] = [];

    constructor(name: string, columns: { cname: string; ctyp: string; }[]) {
        this.name = name;
        this.columns = columns;
    }

    toTableColumns() : any{
        return (
            <TableHead>
                <TableRow>
                    {
                        this.columns.map((col) => {
                            return <TableCell>{col.cname}</TableCell>;
                        })
                    }
                </TableRow>
            </TableHead>
        )
    }
};



class TableRowData {
    schema: TableSchema;
    data: any[];

    constructor(schema: TableSchema, data: any[]) {
        this.schema = schema;
        this.data = data;
    }

    toTableRows(this: TableRowData) : any {
        return (
            <TableBody>
                {
                    this.data.map((row) => {
                        return (
                            <TableRow key={row.id}>
                                {
                                    this.schema.columns.map((col) => {
                                        return <TableCell>{row[col.cname]}</TableCell>;
                                    })
                                }
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        )
    }
};

const tableSchema = new TableSchema(
    'eczane',
    [
        { cname: 'Şehir', ctyp: 'string' },
        { cname: 'İlçe', ctyp: 'string' },
        { cname: 'Konum', ctyp: 'string' },
        { cname: 'Konum Linki', ctyp: 'string' },
    ]
);

const initialData = new TableRowData(
    tableSchema,
    [
        { 'Şehir': 'İstanbul', 'İlçe': 'Kadıköy', 'Konum': 'Kadıköy', 'Konum Linki': 'https://www.google.com/maps/place/Kad%C4%B1k%C3%B6y' },
        { 'Şehir': 'İstanbul', 'İlçe': 'Kadıköy', 'Konum': 'Kadıköy', 'Konum Linki': 'https://www.google.com/maps/place/Kad%C4%B1k%C3%B6y' },
    ]
);

export const DataTable: React.FC = () => {
  const [data, setData] = useState(initialData);
    console.log(data);
  return (
    <Grid container spacing={2}>
        <Grid item xs={12} sm={10} md={8} lg={6}>
            <Paper>
                <TableContainer>
                <Table>
                    {data.schema.toTableColumns()}
                    {data.toTableRows()}
                </Table>
                </TableContainer>
            </Paper>
        </Grid>
    </Grid>
  );
};


