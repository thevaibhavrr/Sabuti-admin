import React, { useEffect, useState } from "react";
import "../../adminCss/dashboard/adminDashboard.css";
import { makeApi } from "../../api/callApi";
import Loader from "../../components/loader/loader";
import { Pie, Doughnut, Bar, Line , Area, Radar } from "react-chartjs-2";
import { Tooltip, Title, ArcElement, Legend, Chart } from "chart.js";

Chart.register(Tooltip, Title, ArcElement, Legend);
function Admindasboard() {
  const [dasboardData, setDasboardData] = useState(0);
  const [loading, setLoading] = useState(false);
  const [TotalRevenue, setTotalRevenue] = useState();
  console.log("toal-------", TotalRevenue)

  // get dasboard data
  // for summary data
  const getDasboardData = async () => {
    try {
      setLoading(true);

      const response = await makeApi("/api/get-dashboard", "GET");
      setDasboardData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // for sale details
  const getSaleDetails = async () => {
    try {
      setLoading(true);
      const response = await makeApi("/api/sale-info?today=true&yesterday=true&thisMonth=true&lastMonth=true&year=true&yearName=2024&date=2024-04-12", "GET");
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  // for revenu details
  const getRevenuDetails = async () => {
    try {
      setLoading(true);
      const response = await makeApi("/api/revenu-info", "GET");
      console.log(response.data);
      await setTotalRevenue(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // set data for revenu
  const revenuChartData = {
    labels: [
      "Total Orders",
      "Total Pending Revenue",
      "Total Delivered Revenue",
      "Total Canceled Revenue",
    ],
    datasets: [
      {
        data: [
          TotalRevenue?.totalOrders || 0,
          TotalRevenue?.totalPendingRevenue || 0,
          TotalRevenue?.totalDeliveredRevenue || 0,
          TotalRevenue?.totalCanceledRevenue || 0,
        ],
        backgroundColor: [
          "#ffc107",
          "#17a2b8",
          "rgb(87, 185, 96)",
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ]
  }

  // set data for order
  const orderChartData = {
    labels: [
      "Pending Orders",
      "Shipped Orders",
      "Delivered Orders",
      "Canceled Orders",
      "Returned Orders",
    ],
    datasets: [
      {
        data: [
          dasboardData?.totalPandingOrders || 0,
          dasboardData?.totalShippedOrders || 0,
          dasboardData?.totalDeliveredOrders || 0,
          dasboardData?.totalCanceledOrders || 0,
          dasboardData?.totalReturnedOrders || 0,
        ],
        backgroundColor: [
          "#ffc107",
          "#17a2b8",
          "rgb(87, 185, 96)",
          "#dc3545",
          "#6610f2",
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(220, 53, 69, 1)",
          "rgba(102, 16, 242, 1)",
        ],
        borderWidth: 1,
      }
    ]
  }

  // calling data using useEffect
  useEffect(() => {
    getDasboardData();
    getSaleDetails()
    getRevenuDetails()
  }, [])
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard-container">
          <div className="dashboard-card">
            <h2>Total Users</h2>
            <p>{dasboardData?.totalUsers}</p>
          </div>
          <div className="dashboard-card">
            <h2>Total Products</h2>
            <p>{dasboardData?.totalProducts}</p>
          </div>

          <div className="dashboard-card">
            <h2>Total Orders</h2>
            <p>{dasboardData?.totalOrders}</p>
          </div>
          <div className="dashboard-card">
            <h2>Total Pending Orders</h2>
            <p>{dasboardData?.totalPandingOrders}</p>
          </div>
          <div className="dashboard-card">
            <h2>Total Shipped Orders</h2>
            <p>{dasboardData?.totalShippedOrders}</p>
          </div>
          <div className="dashboard-card">
            <h2>Total Delivered Orders</h2>
            <p>{dasboardData?.totalDeliveredOrders}</p>
          </div>
          <div className="dashboard-card">
            <h2>Total Canceled Orders</h2>
            <p>{dasboardData?.totalCanceledOrders}</p>
          </div>
          <div className="dashboard-card">
            <h2>Total Returned Orders</h2>
            <p>{dasboardData?.totalReturnedOrders}</p>
          </div>
        </div>
      )}
      {/* graphs */}
      <div className="main_admin_all_graph_div" >
        {/* order */}
        <div className="main_order_pie_chart_graph">
          <h2>Order Distribution</h2>
          <Pie data={orderChartData} />
        </div>

        {/* revenu  */}
        <div className="main_order_pie_chart_graph">
          <h2>Sale Details</h2>
          <Doughnut data={revenuChartData} />
        </div>
      </div>
      {/* show reveq in bar */}
    </div>
  );
}

export default Admindasboard;

// import React, { useEffect, useState } from "react";
// import "../../adminCss/dashboard/adminDashboard.css";
// import { makeApi } from "../../api/callApi";
// import Loader from "../../components/loader/loader";
// import { PieChart, Pie, BarChart, Bar, Cell, Tooltip, Legend } from "recharts";

// // Define COLORS array
// const COLORS = ["#ffc107", "#17a2b8", "rgb(87, 185, 96)", "#dc3545", "#9cf210"];

// function Admindasboard() {
//   const [dasboardData, setDasboardData] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [TotalRevenue, setTotalRevenue] = useState();
  

//   // get dashboard data
//   const getDasboardData = async () => {
//     try {
//       setLoading(true);
//       const response = await makeApi("/api/get-dashboard", "GET");
//       setDasboardData(response.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // for sale details
//   const getSaleDetails = async () => {
//     try {
//       setLoading(true);
//       const response = await makeApi("/api/sale-info?today=true&yesterday=true&thisMonth=true&lastMonth=true&year=true&yearName=2024&date=2024-04-12", "GET");
//       // console.log(response.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   // for revenue details
//   const getRevenueDetails = async () => {
//     try {
//       setLoading(true);
//       const response = await makeApi("/api/revenue-info", "GET");
//       console.log(response.data);
//       setTotalRevenue(response.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   // calling data using useEffect
//   useEffect(() => {
//     getDasboardData();
//     getSaleDetails();
//     getRevenueDetails();
//   }, [])

//   // data for revenue chart
//   const revenueData = [
//     { name: "Total Orders", value: TotalRevenue?.totalOrders || 0 },
//     { name: "Total Pending Revenue", value: TotalRevenue?.totalPendingRevenue || 0 },
//     { name: "Total Delivered Revenue", value: TotalRevenue?.totalDeliveredRevenue || 0 },
//     { name: "Total Canceled Revenue", value: TotalRevenue?.totalCanceledRevenue || 0 }
//   ];

//   // data for order chart
//   const orderData = [
//     { name: "Pending Orders", value: dasboardData?.totalPandingOrders || 0 },
//     { name: "Shipped Orders", value: dasboardData?.totalShippedOrders || 0 },
//     { name: "Delivered Orders", value: dasboardData?.totalDeliveredOrders || 0 },
//     { name: "Canceled Orders", value: dasboardData?.totalCanceledOrders || 0 },
//     { name: "Returned Orders", value: dasboardData?.totalReturnedOrders || 0 }
//   ];

//   return (
//     <div>
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="dashboard-container">
//           {/* Display dashboard cards */}
//           {/* Replace with your dashboard card UI */}
  
//           {/* Order Distribution chart */}
//           <div className="main_order_pie_chart_graph">
//             <h2>Order Distribution</h2>
//             {orderData.length > 0 && (
//               <PieChart width={400} height={400}>
//                 <Pie dataKey="value" data={orderData} fill="#8884d8" label />
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             )}
//             {orderData.length === 0 && <p>No data available for order distribution.</p>}
//           </div>
  
//           {/* Revenue chart */}
//           <div className="main_order_pie_chart_graph">
//             <h2>Sale Details</h2>
//             {revenueData.length > 0 && (
//               <BarChart width={400} height={400} data={revenueData}>
//                 <Bar dataKey="value" fill="#8884d8">
//                   {revenueData.map((entry, index) => (
//                     // <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Bar>
//                 <Tooltip />
//                 <Legend />
//               </BarChart>
//             )}
//             {revenueData.length === 0 && <p>No data available for sale details.</p>}
//           </div>
//         </div>
//       )}
//     </div>
//   );
  
// }

// export default Admindasboard;
