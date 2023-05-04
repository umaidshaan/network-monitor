import { query } from "../../lib/db";

export default async function handler(req, res) {
    try {
        const startDate = req.query.start;
        const endDate = req.query.end;
        const querySql = `
        SELECT date(acctstarttime) as acctstarttime, username, sum(acctinputoctets/1073741824) AS total_octates_used
        FROM radacct
        WHERE acctstarttime BETWEEN '${startDate}' AND '${endDate}' AND acctstoptime is not null
        GROUP BY date(acctstarttime), username`;

        const valueParams = [];
        const data = await query({ query: querySql, values: [valueParams] });

        res.status(200).json({ products: data });
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ error: error.message });
    }
}
