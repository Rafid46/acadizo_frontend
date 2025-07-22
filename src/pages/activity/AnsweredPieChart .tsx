/* eslint-disable @typescript-eslint/no-explicit-any */

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "antd";
import {
  Users,
  UserCheck,
  UserX,
  CheckCircle,
  XCircle,
  TrendingUp,
} from "lucide-react";

interface ActivityPieChartProps {
  activity: any;
  totalStudents: number;
}

const ActivityPieChart = ({
  activity,
  totalStudents,
}: ActivityPieChartProps) => {
  // Get unique students who have answered (not total answers)
  const uniqueStudentsWhoAnswered =
    activity?.answers?.length > 0
      ? [
          ...new Set(
            activity.answers.map(
              (answer: any) => answer?.student?.id || answer?.student?.email
            )
          ),
        ]
      : [];

  const answeredStudentCount = uniqueStudentsWhoAnswered.length;
  const notAnsweredCount = totalStudents - answeredStudentCount;

  const data = [
    {
      name: "Answered",
      value: answeredStudentCount,
      color: "#7ABA78",
      icon: "✓",
    },
    {
      name: "Not Answered",
      value: notAnsweredCount,
      color: "#ff4d4f",
      icon: "✗",
    },
  ];

  const COLORS = ["#7ABA78", "#ff4d4f"];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg w-fit">
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className="text-sm text-gray-600">
            {data.value} students (
            {((data.value / totalStudents) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    if (percent < 0.05) return null; // Don't show label if slice is too small

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="10"
        fontWeight="medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card size="small" className="mb-3 bg-[#F6F8FB]">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="pb-4">
            <div className="flex items-center gap-3 text-slate-700 font-semibold">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              Response Status
            </div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-700">
                    Students Answered
                  </p>
                  <p className="text-xs text-green-600">Completed responses</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-green-700">
                {answeredStudentCount}
              </div>
            </div>

            {/* Students Not Answered */}
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-red-700">
                    Students Not Answered
                  </p>
                  <p className="text-xs text-red-600">Pending responses</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-red-700">
                {notAnsweredCount}
              </div>
            </div>
            {/* Total Students */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700">
                    Total Students
                  </p>
                  <p className="text-xs text-blue-600">Class size</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-700">
                {totalStudents}
              </div>
            </div>
          </div>
        </div>

        <div className="w-20 h-20 ml-3">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                // label={CustomLabel}
                outerRadius={35}
                fill="#8884d8"
                dataKey="value"
                strokeWidth={2}
                stroke="#fff"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-600">
          <span className="text-[12px] font-semibold text-green-800">
            Student Participation Rate
          </span>
          <span className="text-lg font-bold text-green-800">
            {totalStudents > 0
              ? Math.min(
                  (answeredStudentCount / totalStudents) * 100,
                  100
                ).toFixed(1)
              : 0}
            %
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{
              width:
                totalStudents > 0
                  ? `${Math.min(
                      (answeredStudentCount / totalStudents) * 100,
                      100
                    )}%`
                  : "0%",
            }}
          />
        </div>
      </div>

      <div className="mt-2">
        {totalStudents === answeredStudentCount && (
          <div className="flex items-center justify-center p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span className="font-medium">All students have responded! 🎉</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ActivityPieChart;
