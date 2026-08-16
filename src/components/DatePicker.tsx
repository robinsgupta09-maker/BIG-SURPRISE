import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { CONFIG } from "../config";

interface DatePickerProps {
  onSelect: (date: string, time: string) => void;
  initialDate?: string;
  initialTime?: string;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const DatePicker: React.FC<DatePickerProps> = ({
  onSelect,
  initialDate = "",
  initialTime = "evening",
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  
  // Format selected date back as string YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialDate ? new Date(initialDate) : null
  );
  const [selectedTime, setSelectedTime] = useState<string>(initialTime);

  // Get total days in month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayIndex = getFirstDayOfMonth(currentMonth, currentYear);

  const handlePrevMonth = () => {
    if (currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
      return; // Prevent going to past months
    }
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    if (clickedDate < today) return; // Prevent past dates
    setSelectedDate(clickedDate);
  };

  const handleConfirm = () => {
    if (!selectedDate) return;
    
    // Format: "Month DD, YYYY"
    const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" };
    const dateStr = selectedDate.toLocaleDateString("en-US", options);
    
    // Find time label
    const timeOption = CONFIG.dateSelector.timeOptions.find(t => t.id === selectedTime);
    const timeLabel = timeOption ? `${timeOption.emoji} ${timeOption.label}` : selectedTime;

    onSelect(dateStr, timeLabel);
  };

  // Calendar cells generation
  const calendarCells = [];
  // Empty padding cells for previous month
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push(<div key={`empty-${i}`} className="w-10 h-10" />);
  }
  // Days of current month
  for (let day = 1; day <= daysInMonth; day++) {
    const cellDate = new Date(currentYear, currentMonth, day);
    const isPast = cellDate < today;
    const isSelected =
      selectedDate !== null &&
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear;

    calendarCells.push(
      <button
        key={`day-${day}`}
        disabled={isPast}
        onClick={() => handleDateClick(day)}
        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 cursor-pointer ${
          isSelected
            ? "bg-rose-400 text-white shadow-md scale-105"
            : isPast
            ? "text-slate-300 cursor-not-allowed opacity-40"
            : "text-slate-700 hover:bg-rose-50"
        }`}
      >
        {day}
      </button>
    );
  }

  const isPrevDisabled =
    currentMonth === today.getMonth() && currentYear === today.getFullYear();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.98 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-lg p-6 md:p-8 rounded-3xl glass-card relative shadow-xl flex flex-col items-center"
    >
      {/* Decorative backgrounds */}
      <div className="absolute -top-12 -left-12 w-28 h-28 bg-rose-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-purple-200/40 rounded-full blur-3xl" />

      <div className="relative z-10 w-full flex flex-col items-center">
        <span className="text-5xl mb-4 select-none block">📅✨</span>
        <h1 className="font-serif text-3xl font-bold text-slate-800 mb-1">
          {CONFIG.dateSelector.title}
        </h1>
        <p className="text-sm text-slate-500 font-medium mb-6">
          {CONFIG.dateSelector.subtitle}
        </p>

        {/* Custom Calendar Body */}
        <div className="w-full max-w-[320px] bg-white/50 border border-white/80 rounded-2xl p-4 shadow-inner mb-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrevMonth}
              disabled={isPrevDisabled}
              className={`p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer ${
                isPrevDisabled ? "opacity-30 cursor-not-allowed" : ""
              }`}
            >
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </button>
            <h3 className="font-semibold text-slate-700">
              {MONTHS[currentMonth]} {currentYear}
            </h3>
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {WEEKDAYS.map((d) => (
              <div key={d} className="text-xs font-bold text-slate-400 uppercase">
                {d}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 justify-items-center">
            {calendarCells}
          </div>
        </div>

        {/* Optional Time Selector */}
        <div className="w-full text-center mb-8">
          <p className="text-sm font-semibold text-slate-600 mb-3 flex items-center justify-center gap-1.5">
            {CONFIG.dateSelector.timeTitle}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-[340px] mx-auto">
            {CONFIG.dateSelector.timeOptions.map((opt) => {
              const isActive = selectedTime === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedTime(opt.id)}
                  className={`py-2 px-3 rounded-xl border text-sm font-semibold transition-all duration-300 transform active:scale-95 cursor-pointer ${
                    isActive
                      ? "bg-violet-400 text-white border-violet-400 shadow-md"
                      : "bg-white/40 border-slate-200 text-slate-600 hover:bg-white/80 hover:border-slate-300"
                  }`}
                >
                  <span className="block text-lg mb-0.5">{opt.emoji}</span>
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Confirmed display */}
        {selectedDate && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-6 flex items-center gap-2 text-rose-500 font-semibold bg-rose-50 border border-rose-100/60 rounded-xl px-4 py-2 text-sm shadow-sm"
          >
            <CalendarIcon className="w-4 h-4" />
            <span>
              Selected: {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} at{" "}
              {CONFIG.dateSelector.timeOptions.find((t) => t.id === selectedTime)?.label}
            </span>
          </motion.div>
        )}

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={!selectedDate}
          className={`w-full max-w-[280px] py-3.5 rounded-full text-base font-semibold shadow-md active:scale-95 transition-all duration-300 cursor-pointer ${
            selectedDate
              ? CONFIG.theme.primaryColor
              : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
          }`}
        >
          {CONFIG.dateSelector.buttonText}
        </button>
      </div>
    </motion.div>
  );
};
