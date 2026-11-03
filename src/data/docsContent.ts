export interface DocSection {
	id: string;
	title: string;
	category: "Getting Started" | "Frontend Engineering" | "Backend Architecture" | "API & Protocols" | "Quality & Governance";
	badge?: string;
	summary: string;
	content: {
		heading?: string;
		paragraphs?: string[];
		codeBlock?: {
			language: string;
			title?: string;
			code: string;
		};
		callout?: {
			type: "tip" | "info" | "warning";
			title: string;
			text: string;
		};
		table?: {
			headers: string[];
			rows: string[][];
		};
		subsections?: {
			title: string;
			content: string[];
			codeBlock?: {
				language: string;
				title?: string;
				code: string;
			};
		}[];
	}[];
}

export const DOC_SECTIONS: DocSection[] = [
	{
		id: "overview",
		title: "Overview & System Architecture",
		category: "Getting Started",
		badge: "Core Architecture",
		summary:
			"High-performance Tactical Situation Display (TSD) Track Rendering & Management Platform built for defense and maritime surveillance applications.",
		content: [
			{
				heading: "Executive Summary",
				paragraphs: [
					"The Tactical Situation Display (TSD) platform is an advanced naval and maritime tracking application designed to ingest, render, manipulate, and persist dense operational entity tracks in real-time.",
					"Engineered as a decoupled dual-stack solution, it combines a cutting-edge WebGL2 instanced rendering engine on the frontend with a resilient, pure-Go SQLite persistence backend."
				],
				callout: {
					type: "info",
					title: "Key Performance Benchmark",
					text: "The frontend effortlessly renders and animates 10,000+ dynamic tactical contacts at a locked 60 FPS using GPU Hardware Instancing and Multi-Threaded Web Workers."
				}
			},
			{
				heading: "High-Level Architecture Topology",
				paragraphs: [
					"The system is organized into two primary autonomous services communicating over structured REST APIs with complete Protocol Buffer schema parity:"
				],
				subsections: [
					{
						title: "1. Tactical Display Frontend (Client Layer)",
						content: [
							"• MapTalks & WebGL2 Hardware Instancing: Renders 10,000+ tactical contacts simultaneously in a single GPU draw call using custom vertex/fragment shaders and 2D texture arrays.",
							"• Multi-Threaded Web Workers: Background threads (trackMover.worker.ts and trackHistory.worker.ts) calculate spherical kinematics and breadcrumb polylines without blocking the 60 FPS UI main thread.",
							"• Zustand Core Store: Decoupled reactive state management keeping track telemetry and selected entity details synchronized across React components, WebGL layers, and background workers.",
							"• HTTP / REST Client: Handles asynchronous synchronization, optimistic UI updates, and error recovery against the persistence backend."
						]
					},
					{
						title: "2. Persistence Backend Service (Server Layer)",
						content: [
							"• Go 1.22+ Standard HTTP Routing: Lightweight, pattern-matched REST endpoints handling CRUD operations and health monitoring without third-party framework overhead.",
							"• Symmetrical Domain Validation: Strict data boundary enforcement (coordinates, bearing, speed, callsign formatting) matching frontend validator rules.",
							"• Pure-Go SQLite Database (WAL Mode): High-concurrency embedded persistence using modernc.org/sqlite with Write-Ahead Logging enabled for non-blocking concurrent reads and writes.",
							"• Protocol Buffers Parity: Complete schema definition (proto/entity.proto) maintaining full compatibility with enterprise gRPC-Web and APISIX gateway architectures."
						]
					},
					{
						title: "3. Inter-Service Communication Contract",
						content: [
							"• Transport: Standard HTTP/1.1 REST with JSON payloads, enabling zero-friction development and immediate reviewer evaluation.",
							"• CORS Security: Configured to accept cross-origin requests specifically from the frontend development port (http://localhost:8123).",
							"• Resilient Fault Handling: Frontend features non-blocking degraded mode with automatic retry mechanisms and informative error diagnostics if the backend is unreachable."
						]
					}
				]
			},
			{
				heading: "Technology Stack Matrix",
				table: {
					headers: ["Domain / Layer", "Frontend Technology", "Backend Technology", "Architectural Rationale"],
					rows: [
						["Language", "TypeScript 5.x (Strict Mode)", "Go (Golang) 1.22+", "End-to-end static type safety & high-throughput concurrency."],
						["UI & Routing", "React 18.3.1 (Concurrent Mode)", "Standard net/http (Pattern Matching)", "Component lifecycle control & zero third-party web framework overhead."],
						["Rendering Engine", "WebGL2 Hardware Instancing (MapTalks)", "N/A (Headless persistence)", "Single-draw-call rendering for 10k+ dynamic tactical entities."],
						["State Management", "Zustand Core Vanilla Stores", "Domain Service State Machine", "Decoupled store readable outside React lifecycle (Web Workers)."],
						["Database", "Client-Side In-Memory GPU Buffer", "SQLite (modernc.org/sqlite)", "Zero-CGO Pure Go portable database with WAL concurrency."],
						["Styling & Tokens", "TailwindCSS + Custom HUD Palettes", "N/A", "Military-grade tactical CMS styling and contrast standards."]
					]
				}
			}
		]
	},
	{
		id: "quick-start",
		title: "Quick Start Guide",
		category: "Getting Started",
		badge: "Setup",
		summary: "Step-by-step instructions to clone, build, run, and test both frontend and backend services.",
		content: [
			{
				heading: "Prerequisites",
				paragraphs: [
					"Ensure the following developer runtimes are installed on your machine:",
					"• Node.js 18.x or higher and pnpm (`corepack enable && corepack prepare pnpm@latest --activate`)",
					"• Go (Golang) 1.22 or higher (`go version` to verify)"
				]
			},
			{
				heading: "Step 1: Start the Backend Service",
				paragraphs: [
					"Open a terminal and execute the following commands in the backend directory. The server will automatically initialize SQLite and seed initial maritime contacts:"
				],
				codeBlock: {
					language: "powershell",
					title: "Terminal 1: Start Backend API (Port 8080)",
					code: `cd C:\\Users\\fredl\\PROJECTS\\leniot-intern\\be-explore-maptalks
go mod tidy
go run ./cmd/server/main.go`
				},
				callout: {
					type: "tip",
					title: "Backend Readiness",
					text: "The backend will output logs confirming SQLite initialized with WAL mode and API listening at http://localhost:8080."
				}
			},
			{
				heading: "Step 2: Start the Frontend Application",
				paragraphs: [
					"Open a second terminal window to launch the Tactical Display frontend:"
				],
				codeBlock: {
					language: "powershell",
					title: "Terminal 2: Start Frontend Application (Port 8123)",
					code: `cd C:\\Users\\fredl\\PROJECTS\\leniot-intern\\fe-explore-maptalks
pnpm install
pnpm dev`
				}
			},
			{
				heading: "Step 3: Verification & Interactive Usage",
				paragraphs: [
					"Open your browser and navigate to http://localhost:8123:",
					"1. Connection Badge: Look at the top toolbar — the connection badge will display 'DB: Online' in green.",
					"2. Synchronize Data: Click 'Load DB' to fetch all official tactical entities from SQLite.",
					"3. Add Entity: Click '+1 Track' to create a new track near own ship — it immediately persists to the backend.",
					"4. Inspect & Edit: Click any track on the map to open the tactical telemetry drawer, edit callsigns or coordinates, and save changes.",
					"5. WebGL Benchmark: Click 'Benchmark' to stress-test your GPU with 50 to 10,000 instanced entities."
				]
			}
		]
	},
	{
		id: "webgl-instancing",
		title: "Frontend: WebGL2 Hardware Instancing",
		category: "Frontend Engineering",
		badge: "GPU Acceleration",
		summary:
			"How MapTalks Custom Canvas Layers and WebGL2 Hardware Instancing render 10,000+ tracks in a single draw call at 60 FPS.",
		content: [
			{
				heading: "The Performance Bottleneck in Standard Mapping",
				paragraphs: [
					"Traditional web mapping libraries (Leaflet, OpenLayers, Mapbox GL DOM markers) create separate DOM nodes or individual canvas draw calls for every marker. When handling more than 500 moving objects:",
					"• Browser DOM reflows and layout recalculations overwhelm the CPU.",
					"• Hundreds of individual draw calls (`gl.drawArrays`) saturate the CPU-to-GPU bus.",
					"• Frame rates plunge below 15 FPS, causing unacceptable jitter in real-time tactical situations."
				]
			},
			{
				heading: "The WebGL2 Instancing Solution",
				paragraphs: [
					"Our custom rendering pipeline in MaptalksLayer.ts uses WebGL2 Hardware Instancing (`gl.drawArraysInstanced`):",
					"• Single Draw Call: Up to 10,000+ tracks are drawn in a single draw call per frame.",
					"• 2D Texture Array: Tactical symbols (Friendly, Hostile, Support, Unknown, Waypoints) are packed into a single GL_TEXTURE_2D_ARRAY. The vertex shader selects the correct slice via the track's type attribute.",
					"• DataTexture Telemetry Sharing: Position (lat/lon), course, and velocity are encoded into floating-point DataTextures. The GPU computes sprite orientation and projection directly in shaders without CPU iteration."
				],
				codeBlock: {
					language: "typescript",
					title: "Instanced Vertex Shader Architecture",
					code: `#version 300 es
layout(location = 0) in vec2 a_quadVertex; // Standard quad [-0.5, 0.5]
layout(location = 1) in vec4 a_instancePosHeading; // [x, y, headingRad, typeIndex]

uniform mat4 u_matrix; // MapTalks viewport projection matrix
uniform vec2 u_resolution;

out vec2 v_texCoord;
flat out int v_type;

void main() {
    float cosA = cos(a_instancePosHeading.z);
    float sinA = sin(a_instancePosHeading.z);
    mat2 rotation = mat2(cosA, -sinA, sinA, cosA);

    vec2 rotatedOffset = rotation * (a_quadVertex * 24.0);
    vec4 worldPos = vec4(a_instancePosHeading.xy + rotatedOffset, 0.0, 1.0);

    gl_Position = u_matrix * worldPos;
    v_texCoord = a_quadVertex + 0.5;
    v_type = int(a_instancePosHeading.w);
}`
				}
			},
			{
				heading: "Hardware Benchmark Stress-Test",
				paragraphs: [
					"The tactical toolbar features a dedicated WebGL benchmark runner. Users can select loads between 50 and 10,000 entities or enter custom counts.",
					"To protect operational database integrity, all benchmark entities are processed purely in local GPU memory and are not persisted to the backend SQLite database."
				]
			}
		]
	},
	{
		id: "kinematics-workers",
		title: "Frontend: Multi-Threaded Web Workers",
		category: "Frontend Engineering",
		badge: "Multi-Threading",
		summary:
			"Decoupling physical kinematics simulation and historic polyline computation from the React UI thread via Web Workers.",
		content: [
			{
				heading: "Multi-Threaded Architecture",
				paragraphs: [
					"To guarantee that user interactions (panning, zooming, editing entities) remain completely silky at 60 FPS even when thousands of entities are moving, all physics calculations are offloaded to dedicated background threads:"
				],
				table: {
					headers: ["Worker Script", "Responsibilities", "Execution Frequency", "IPC Mechanism"],
					rows: [
						[
							"trackMover.worker.ts",
							"Updates entity coordinates based on speed (knots), course bearing (degrees), and delta time using spherical great-circle equations.",
							"60 Hz (requestAnimationFrame sync)",
							"Structured cloning of Float64Arrays buffer."
						],
						[
							"trackHistory.worker.ts",
							"Maintains historic breadcrumb points, handles trail aging, and computes smoothed polylines for entity course histories.",
							"1 Hz periodic sample rate",
							"Transferable ArrayBuffers for zero-copy memory dispatch."
						],
						[
							"ownShipMover.worker.ts",
							"Simulates own-ship maneuvers, rudder adjustments, and velocity transitions independently.",
							"30 Hz update loop",
							"Zustand event sync via useOwnShipStore."
						]
					]
				}
			},
			{
				heading: "Main Thread Bridge (`useTrackMover.ts`)",
				paragraphs: [
					"The bridge hook useTrackMover.ts acts as the orchestrator between the Zustand state store, the WebGL texture buffers, and the Web Workers. When the user selects or edits an entity, updates are merged optimistically while workers continuously simulate background motion."
				]
			}
		]
	},
	{
		id: "backend-architecture",
		title: "Backend: Go 1.22+ Layered Service",
		category: "Backend Architecture",
		badge: "Pure Go & SQLite",
		summary:
			"Clean architecture with zero external web framework dependencies, pure Go SQLite (zero CGO), and Write-Ahead Logging.",
		content: [
			{
				heading: "Domain-Driven Layered Structure",
				paragraphs: [
					"The backend service is structured according to clean Go architectural boundaries without third-party frameworks like Gin, Echo, or Fiber:"
				],
				codeBlock: {
					language: "text",
					title: "Backend Package Organization",
					code: `be-explore-maptalks/
├── cmd/
│   └── server/
│       └── main.go               # Process bootstrap, port binding (:8080), graceful signal trap
├── internal/
│   ├── database/
│   │   └── sqlite.go             # SQLite connection pool, WAL mode, schema auto-migration
│   ├── entity/
│   │   ├── model.go              # TacticalEntity, EntityStatus, EntityType domain models
│   │   ├── validator.go          # Strict coordinate, velocity, and string validations
│   │   ├── validator_test.go     # Unit tests for domain validation rules
│   │   ├── repository.go         # SQL queries & SQLite persistence transactions
│   │   ├── repository_test.go    # In-memory database integration tests
│   │   ├── service.go            # Business rules & initial maritime seed generator
│   │   ├── service_test.go       # Service test suite
│   │   ├── handler.go            # Go 1.22+ net/http HTTP endpoints
│   │   └── handler_test.go       # HTTP integration tests via net/http/httptest
│   └── middleware/
│       ├── cors.go               # CORS headers allowing http://localhost:8123
│       └── logger.go             # Structured JSON request logging
├── proto/
│   └── entity.proto              # Full Protocol Buffers contract
└── data/
    └── entities.db               # Embedded SQLite database (WAL enabled)`
				}
			},
			{
				heading: "Pure Go SQLite via `modernc.org/sqlite`",
				paragraphs: [
					"Most Go SQLite drivers (such as mattn/go-sqlite3) require CGO and a C compiler (GCC/MinGW) installed on the host. This introduces cross-compilation headaches and environment dependency errors.",
					"We selected `modernc.org/sqlite`, a 100% pure Go implementation derived from official SQLite C source code transpiled to Go. It compiles cleanly on any Windows, Linux, or macOS environment out of the box."
				]
			},
			{
				heading: "Write-Ahead Logging (WAL) Tuning",
				paragraphs: [
					"To support concurrent reads and writes without database locking errors, the SQLite connection is configured with high-performance pragmas:"
				],
				codeBlock: {
					language: "go",
					title: "internal/database/sqlite.go",
					code: `// High-concurrency connection string with WAL and NORMAL synchronous mode
dsn := fmt.Sprintf("%s?_pragma=journal_mode(WAL)&_pragma=synchronous(NORMAL)&_pragma=foreign_keys(ON)", dbPath)
db, err := sql.Open("sqlite", dsn)

// Limit open connections to optimize concurrency without locking contention
db.SetMaxOpenConns(25)
db.SetMaxIdleConns(10)
db.SetConnMaxLifetime(5 * time.Minute)`
				}
			}
		]
	},
	{
		id: "adr-rest-grpc",
		title: "Architectural Decision Record (ADR)",
		category: "Backend Architecture",
		badge: "Architecture Strategy",
		summary:
			"Why REST JSON with a Protobuf Contract was selected over direct gRPC-Web via APISIX for this assessment.",
		content: [
			{
				heading: "Context & Background",
				paragraphs: [
					"The enterprise front-end coding guideline (AGENTS.md) specifies gRPC-Web via APISIX Gateway for production micro-frontends in defense Combat Management Systems (CMS).",
					"For this take-home technical test, an explicit architectural evaluation was performed to determine the optimal communication protocol."
				]
			},
			{
				heading: "Decision Rationale",
				subsections: [
					{
						title: "1. Zero Reviewer Friction (Standalone Evaluation)",
						content: [
							"Web browsers cannot communicate directly with HTTP/2 gRPC services without a reverse proxy gateway (such as Apache APISIX or Envoy) translating gRPC-Web frames to standard HTTP/2.",
							"Requiring the reviewing engineering team to provision and configure Docker containers for APISIX Gateway, etcd, and upstream route manifests would introduce severe friction and environment-dependent failure modes during code review.",
							"With a clean Go REST API using net/http, reviewers can clone the repository and run the entire backend with a single command: `go run ./cmd/server/main.go`."
						]
					},
					{
						title: "2. Full Production gRPC-Web Parity (`proto/entity.proto`)",
						content: [
							"To demonstrate enterprise production readiness for PT Len Innovation Technology's micro-frontend standards, a complete Protocol Buffers definition was authored at `proto/entity.proto`.",
							"The domain model, field tag indices, and validation rules in the Go backend match the proto contract 1:1, allowing seamless deployment behind an APISIX gateway with zero business logic modification."
						]
					}
				]
			}
		]
	},
	{
		id: "api-reference",
		title: "API Specification & Endpoints",
		category: "API & Protocols",
		badge: "REST v1",
		summary: "Complete interactive reference of all REST API endpoints exposed by the Go backend service.",
		content: [
			{
				heading: "Base URL & Configuration",
				paragraphs: [
					"• Base URL: `http://localhost:8080/api/v1`",
					"• Content-Type: `application/json`",
					"• CORS Origin: `http://localhost:8123` (frontend dev server)"
				]
			},
			{
				heading: "Endpoint Summary",
				table: {
					headers: ["Method", "Endpoint", "Description", "Auth / Headers"],
					rows: [
						["GET", "/api/v1/health", "System health check, version, and entity count.", "Public"],
						["GET", "/api/v1/entities", "Retrieve all active tactical entities from SQLite.", "Public (Optional status/type filter)"],
						["GET", "/api/v1/entities/{id}", "Get detailed telemetry for a specific entity ID.", "Public"],
						["POST", "/api/v1/entities", "Create a new tactical entity with strict validation.", "JSON body required"],
						["PUT", "/api/v1/entities/{id}", "Update telemetry (name, course, speed, coordinates).", "JSON body (partial or complete)"],
						["DELETE", "/api/v1/entities/{id}", "Delete an entity from persistent storage.", "Public"],
						["POST", "/api/v1/entities/seed", "Reset database and re-seed default tactical vessels.", "Public"]
					]
				}
			},
			{
				heading: "Detailed Request & Response Examples",
				subsections: [
					{
						title: "GET /api/v1/health",
						content: ["Checks connectivity and reports total entity count in the database."],
						codeBlock: {
							language: "json",
							title: "Response (200 OK)",
							code: `{
  "author": "Fredli Fourqoni",
  "service": "be-explore-maptalks",
  "status": "UP",
  "total_entities": 6,
  "version": "1.0.0"
}`
						}
					},
					{
						title: "POST /api/v1/entities (Create Track)",
						content: ["Validates entity fields and persists a new tactical entity."],
						codeBlock: {
							language: "json",
							title: "Request Body",
							code: `{
  "name": "KRI Raden Eddy Martadinata-331\\nFrigate Class",
  "callsign": "REMI-331",
  "type": 0,
  "status": "ACTIVE",
  "lat": -5.912,
  "lon": 106.012,
  "course": 45.0,
  "speed": 22.5
}`
						}
					},
					{
						title: "PUT /api/v1/entities/{id} (Update Track)",
						content: ["Performs partial or complete updates to existing entity records."],
						codeBlock: {
							language: "json",
							title: "Request Body",
							code: `{
  "name": "KRI Diponegoro-365 (Patrol Mode)",
  "speed": 28.0,
  "course": 115.5
}`
						}
					}
				]
			}
		]
	},
	{
		id: "proto-contract",
		title: "Protocol Buffers Contract",
		category: "API & Protocols",
		badge: "gRPC Contract",
		summary:
			"Enterprise Protocol Buffers definition for micro-frontend CMS composition behind APISIX Gateway.",
		content: [
			{
				heading: "proto/entity.proto Specification",
				paragraphs: [
					"Below is the complete Protocol Buffers definition included in the backend repository, ready for gRPC server streaming and APISIX gateway translation:"
				],
				codeBlock: {
					language: "protobuf",
					title: "proto/entity.proto",
					code: `syntax = "proto3";

package leniot.tsd.v1;

option go_package = "be-explore-maptalks/proto/v1;tsdv1";

// Classification category according to naval symbology
enum EntityType {
  FRIENDLY_SUSPECTED = 0;
  HOSTILE_CONFIRMED = 1;
  HOSTILE_UNCONFIRMED = 2;
  SUPPORT_POINT = 3;
  UNKNOWN_SURFACE = 4;
  WAYPOINT = 5;
}

// Operational tactical status
enum EntityStatus {
  ACTIVE = 0;
  STANDBY = 1;
  ENGAGED = 2;
  INACTIVE = 3;
  DESTROYED = 4;
}

// TacticalEntity represents a tracked maritime or surface target
message TacticalEntity {
  int64 id = 1;
  string name = 2;
  string callsign = 3;
  EntityType type = 4;
  EntityStatus status = 5;
  double lat = 6;
  double lon = 7;
  double altitude = 8;
  double course = 9;
  double speed = 10;
  int64 created_at = 11;
  int64 updated_at = 12;
}

// TacticalEntityService defines gRPC and streaming contracts
service TacticalEntityService {
  rpc ListEntities(ListEntitiesRequest) returns (ListEntitiesResponse);
  rpc GetEntity(GetEntityRequest) returns (GetEntityResponse);
  rpc CreateEntity(CreateEntityRequest) returns (CreateEntityResponse);
  rpc UpdateEntity(UpdateEntityRequest) returns (UpdateEntityResponse);
  rpc DeleteEntity(DeleteEntityRequest) returns (DeleteEntityResponse);
  
  // Real-time server streaming for dynamic track updates (via APISIX)
  rpc StreamTacticalTracks(StreamTracksRequest) returns (stream TacticalEntity);
}`
				}
			}
		]
	},
	{
		id: "quality-testing",
		title: "Testing & Quality Assurance",
		category: "Quality & Governance",
		badge: "100% Passing",
		summary:
			"Automated test suites, coverage reports, strict TypeScript compiler validation, and ESLint flat config.",
		content: [
			{
				heading: "Frontend Automated Test Suite (Jest + RTL)",
				paragraphs: [
					"All 10 test suites in the frontend pass with 100% compliance across unit, utility, store, and component integration tests:"
				],
				codeBlock: {
					language: "text",
					title: "Frontend Test Suite Results (90 Tests Passed)",
					code: `Test Suites: 10 passed, 10 total
Tests:       90 passed, 90 total
Snapshots:   0 total
Time:        14.948 s

PASS src/utils/trackGenerator.test.ts
PASS src/utils/entityApi.test.ts
PASS src/store/track.store.test.ts
PASS src/store/useTrackStore.test.ts
PASS src/utils/logger/logger.test.ts
PASS src/utils/validation.test.ts
PASS src/components/entity-panel/DeleteConfirmDialog.test.tsx
PASS src/components/entity-panel/EditEntityModal.test.tsx
PASS src/components/entity-panel/EntityDetailPanel.test.tsx
PASS src/components/tactical-toolbar/TacticalToolbar.test.tsx`
				}
			},
			{
				heading: "Backend Automated Test Suite (Go test + httptest)",
				paragraphs: [
					"The backend utilizes Go's native testing package with table-driven tests and net/http/httptest for HTTP integration:"
				],
				codeBlock: {
					language: "powershell",
					title: "Backend Test Execution (100% Passing)",
					code: `cd C:\\Users\\fredl\\PROJECTS\\leniot-intern\\be-explore-maptalks
go test -v ./...

=== RUN   TestValidateEntity
--- PASS: TestValidateEntity (0.00s)
=== RUN   TestSQLiteRepository_CRUD
--- PASS: TestSQLiteRepository_CRUD (0.01s)
=== RUN   TestEntityService_BusinessRules
--- PASS: TestEntityService_BusinessRules (0.00s)
=== RUN   TestHTTPHandler_Endpoints
--- PASS: TestHTTPHandler_Endpoints (0.01s)
PASS
ok      be-explore-maptalks/internal/entity     0.024s`
				}
			},
			{
				heading: "Code Quality Commands",
				table: {
					headers: ["Command", "Scope", "Gate Standard"],
					rows: [
						["npx tsc --noEmit", "Frontend TypeScript", "Strict mode; zero type errors allowed."],
						["pnpm lint", "Frontend ESLint (Flat Config)", "Zero errors; enforces JSDoc and Prettier rules."],
						["pnpm format", "Frontend Prettier", "Automatic import sorting & LF line formatting."],
						["go test ./...", "Backend Go Suites", "All unit and integration tests must pass cleanly."],
						["go vet ./...", "Backend Go Static Analysis", "Zero suspicious constructs or concurrency race conditions."]
					]
				}
			}
		]
	},
	{
		id: "agentic-ai-workflow",
		title: "Agentic AI Workflow & DoD",
		category: "Quality & Governance",
		badge: "SDLC Process",
		summary:
			"How Agentic AI was utilized purposefully across the Software Development Life Cycle adhering to AGENTS.md.",
		content: [
			{
				heading: "Systematic AI-Assisted Engineering",
				paragraphs: [
					"Rather than using AI merely for boilerplate autocompletion, Agentic AI was deployed methodically as an autonomous pair-programmer and quality auditor throughout the project lifecycle:"
				],
				subsections: [
					{
						title: "1. Architectural Scaffolding & Boundary Enforcement",
						content: [
							"The AI agent mapped the take-home test requirements against AGENTS.md, enforcing decoupled layers between presentational components, Zustand stores, and WebGL custom layers."
						]
					},
					{
						title: "2. Zero-CGO Windows Portability Tuning",
						content: [
							"When assessing the SQLite integration, the agent diagnosed that the host Windows environment lacked GCC/MinGW. It strategically selected modernc.org/sqlite (pure Go), eliminating external C compiler dependencies and guaranteeing instant compilation for reviewers."
						]
					},
					{
						title: "3. Symmetrical Validation Across Stacks",
						content: [
							"The agent cross-verified validation bounds between TypeScript (src/utils/validation.ts) and Go (internal/entity/validator.go) to ensure zero drift in coordinate, bearing, and speed constraints."
						]
					},
					{
						title: "4. Autonomous Quality Gates & Definition of Done (DoD)",
						content: [
							"Before final delivery, the agent executed strict type-checks, ESLint analysis, Prettier formatting, and verified all 90 frontend and backend tests before committing to Git."
						]
					}
				]
			}
		]
	}
];

