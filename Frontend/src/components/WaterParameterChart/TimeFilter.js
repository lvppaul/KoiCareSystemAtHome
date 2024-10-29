import { useState } from 'react';

export const TimeFilter = ({ onFilterChange }) => {
    const [timeFilter, setTimeFilter] = useState("last_3_days");
    const [startDate, setStartDate] = useState(""); // Ngày bắt đầu
    const [endDate, setEndDate] = useState(""); // Ngày kết thúc

    const handleTimeFilterChange = (e) => {
        const filter = e.target.value;
        setTimeFilter(filter);
        onFilterChange({ timeFilter: filter, startDate, endDate });
    };

    const handleStartDateChange = (e) => {
        const start = e.target.value;
        setStartDate(start);
        onFilterChange({ timeFilter, startDate: start, endDate });
    };

    const handleEndDateChange = (e) => {
        const end = e.target.value;
        setEndDate(end);
        onFilterChange({ timeFilter, startDate, endDate: end });
    };

    return (
        <div>
            <select style={{ background: "orange", color: "white", padding: 10 }} onChange={handleTimeFilterChange} value={timeFilter}>
                <option value="last_3_days">3 ngày gần nhất</option>
                <option value="last_week">Tuần vừa qua</option>
                <option value="custom">Tùy chỉnh</option>
            </select>

            {timeFilter === "custom" && (
                <div>
                    <input type="date" onChange={handleStartDateChange} value={startDate} />
                    <input type="date" onChange={handleEndDateChange} value={endDate} />
                </div>
            )}
        </div>
    );
};
