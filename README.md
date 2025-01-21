# CryptoSpace
Develop a responsive web application that displays real-time and historical data for selected cryptocurrencies using React, Redux, and Chart.js. The app should include multiple routes for easier navigation and feature a cryptocurrency dashboard, an overview page, and a history page.
# React Developer Assignment - Architect  

## Real-Time Cryptocurrency Dashboard with Routing and Overview  

### Objective  
Develop a responsive web application that displays real-time and historical data for selected cryptocurrencies using **React**, **Redux**, and **Chart.js**. The application includes multiple routes for easy navigation and features a cryptocurrency dashboard, an overview page, and a history page.  

---

## Assignment Deliverables  

### Functional Requirements  
#### **Dashboard Layout**  
1. **Header**:  
   - Application title.  
   - Dropdown menu to select a cryptocurrency (e.g., Bitcoin, Ethereum).  
   - Navigation menu with links to:  
     - Dashboard  
     - Overview  
     - History  

2. **Main Routes**:  
   - **Dashboard Route**:  
     - **Current Price Display**:  
       - Show the current price of the selected cryptocurrency.  
       - Display percentage change over the last 24 hours.  
     - **Historical Data Chart**:  
       - Line chart visualizing the price trend over the past 7 days using Chart.js.  

   - **Overview Route**:  
     - Key details about the selected cryptocurrency, including:  
       - Market Cap  
       - Total Supply  
       - Circulating Supply  
       - All-Time High price  
       - Rank  
       - Brief description of the cryptocurrency's purpose and usage  

   - **History Route**:  
     - Table showing historical price data (price, date, and 24-hour volume).  
     - Search or filter option to refine the data.  

3. **Footer**:  
   - Display the last updated time.  

---

## Routing Setup  
- Use **React Router** to define the following routes:  
  1. `/dashboard`: Displays the main cryptocurrency dashboard.  
  2. `/overview`: Displays detailed information about the selected cryptocurrency.  
  3. `/history`: Displays historical data in a tabular format.  

---

## State Management  
Use **Redux** to manage:  
1. Selected Cryptocurrency: Current selection via dropdown.  
2. Price Data: Current price and percentage change.  
3. Historical Data: 7-day price history.  
4. Overview Data: Market cap, supply details, rank, and description.  

---

## Data Fetching  
1. **Current Price**:  
   - Fetch current price and 24-hour percentage change using the **CoinCap API** or **CoinGecko API**.  
2. **Historical Data**:  
   - Retrieve the past 7 days of price history for the selected cryptocurrency.  
3. **Overview Data**:  
   - Fetch detailed information (market cap, supply details, rank, and description).  
4. **Optional Real-Time Updates**:  
   - Integrate WebSocket for live price updates.  

---

## Features and Functionality  

### **Routes and Navigation**  
1. **Dashboard**:  
   - Displays live data and a historical chart.  
   - Dropdown to select a cryptocurrency.  
2. **Overview**:  
   - Shows details and a description of the selected cryptocurrency.  
3. **History**:  
   - Displays historical data in a tabular format with filtering/search options.  

### **User Interactions**  
- Dropdown selection dynamically updates the dashboard and other views.  
- Smooth navigation between routes using **React Router**.  

### **Styling and Design**  
- Responsive design for desktop and mobile.  
- Use a CSS framework like **TailwindCSS** or **Material-UI**.  
- Smooth transitions between routes.  

---

## Development Plan (48 Hours)  

### **Day 1**  
#### **Hour 1–4**: Project Setup  
1. Initialize the React project using Vite or Create React App.  
2. Set up folder structure:  
   - `components/`, `pages/`, `redux/`, `services/`, `styles/`  
3. Install dependencies:  
   ```bash  
   npm install react-redux @reduxjs/toolkit react-router-dom chart.js react-chartjs-2 axios tailwindcss  


