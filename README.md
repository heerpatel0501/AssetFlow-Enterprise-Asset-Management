# AssetFlow: Enterprise Decision Center & ERP Platform

AssetFlow is a next-generation Enterprise Resource Planning (ERP) and Asset Lifecycle Management platform designed to transform how organizations track, manage, and optimize their physical and digital resources. Moving beyond traditional CRUD (Create, Read, Update, Delete) asset tracking, AssetFlow introduces an **Enterprise Decision Center** powered by intelligent workflows, predictive maintenance heuristics, and a rigorous compliance audit engine.

## 🏆 Core Architectural Pillars

### 1. The Digital Asset Passport (Digital Twin)
Every asset in the ecosystem is assigned a comprehensive Digital Passport that tracks its complete lineage.
* **Rule-Based Asset Health Engine**: Dynamically calculates a health score (0-100) based on age, warranty decay, repair history, and audit conditions.
* **ERP Audit Trail**: An immutable, Git-style timeline visualization of the asset's lifecycle (Procurement → Allocation → Transfer → Verification → Maintenance → Retirement).
* **ESG Sustainability Meter**: Quantifies environmental impact by tracking e-waste prevented and carbon footprint reduction through prolonged asset lifecycles.

### 2. Intelligent Enterprise Workflows & Conflict Resolution
AssetFlow anticipates operational bottlenecks and resolves them programmatically.
* **Smart Approval Engine**: Automated rules engine (e.g., assets > ₹80,000 trigger multi-tier Department Head + Asset Manager approval workflows).
* **Double-Booking & Conflict Detection**: Proactively identifies allocation overlap and instantly provisions Transfer Requests rather than throwing static error codes.
* **Automatic Decision Engine**: Business logic that auto-generates High-Priority Maintenance Requests when assets are returned flagged as "Damaged," eliminating manual ticket creation.

### 3. Role-Based Access Control (RBAC) & Dynamic Dashboards
The platform adapts its interface and capabilities strictly to the authenticated user's organizational tier.
* **Executive Decision Center (Admin/CEO)**: Focuses on actionable intelligence—identifying idle asset capital, pending transfer conflicts, overdue audits, and total repair liabilities.
* **Asset Manager Portal**: Focuses on operational throughput—approving transfers, managing maintenance pipelines, and overseeing departmental audit heatmaps.
* **Employee Portal**: A streamlined interface focused strictly on individual accountability—viewing assigned assets and booking shared resources.

### 4. Quarterly Compliance & Audit Engine
Replaces legacy spreadsheet audits with a real-time verification matrix.
* **Audit Heatmaps**: Visualizes compliance progress across organizational hierarchies (e.g., IT vs. HR vs. Sales).
* **Automated Discrepancy Generation**: Instantly flags assets that fail physical verification and queues them for managerial review.

## 🛠️ Technology Stack
* **Frontend**: React.js, Vite, Context API for State/Auth Management, Lucide Icons.
* **Styling**: Modern CSS3 with Glassmorphism UI patterns, CSS Variables for seamless Dark/Light Mode scaling, and keyframe micro-animations for high-fidelity interactions.
* **Backend Integration Strategy**: Designed for seamless integration with Python/Odoo enterprise backends via RESTful APIs.

## 🚀 Getting Started (Development Environment)

### Prerequisites
* Node.js (v18+)
* npm or yarn

### Installation & Execution
```bash
# Navigate to the frontend application directory
cd assetflow-react-app

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

### Accessing the RBAC Mock Environments
Navigate to `http://localhost:5173/` and utilize the following credentials to explore the dynamic routing:
* **Admin Role**: Username `heer` (Full Enterprise Decision Center)
* **Manager Role**: Username `priya` (Asset Management & Approvals)
* **Employee Role**: Username `rahul` (Restricted Self-Service Portal)

---
*Engineered with precision for enterprise scalability. Developed for the Odoo Hackathon.*
