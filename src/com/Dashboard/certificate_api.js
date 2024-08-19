import { Query } from "appwrite";
import { db } from "../api";


export const fetchPaginatedData = async (page, limit) => {
    const offset =  (page - 1) * limit  < 0 ? 0:page  * limit
    try {
        const response = await db.listDocuments("66b6ba35003bd0a4efa4", "66b6ba3f002b5d818ab7", [
            Query.limit(limit),
            Query.offset(offset)
        ]);
        const totalRecords = response.total;
        const totalPages = Math.ceil(totalRecords / limit);
        return {
            data: response.documents,
            pagination: {
                total_records: totalRecords,
                current_page: page,
                total_pages: totalPages,
                next_page: page < totalPages ? page + 1 : null,
                prev_page: page > 1 ? page - 1 : null,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};
