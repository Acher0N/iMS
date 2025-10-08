# OfflineEngine Flowchart

This file contains a Mermaid flowchart showing how the OfflineEngine modules interact with each other and with the host app and network.

```mermaid
flowchart TD
  subgraph App[Host App / UI]
    A[Redux/UI] -->|init()| B(Index)
    A -->|enqueue(op)| B
    A -->|read local| DB
  end

  subgraph Engine[OfflineEngine]
    B(Index) --> C[EventListeners]
    B --> DB[Database]
    B --> SW[ServiceWorker]
    B --> SM[SyncManager]

    SW --> CM[CacheManager]
    SW -->|Background Sync| SM
    SM --> DB
    SM -->|firebase calls| FB[Firebase Backend]
    CM -->|serves cached assets/data| SW
    DB -->|persisted queue & snapshots| SM
    C -->|connectivity events| SM
    C -->|connectivity events| B
  end

  FB[Firebase Backend] -->|responses/acks| SM
  FB -->|data reads| A

  note right of B
    `index.js` wires modules, exposes API:
    - init(), shutdown(), enqueue(), getStatus(), on()
  end

  classDef engine fill:#f9f,stroke:#333,stroke-width:1px;
  class Engine engine

```

## How to view
- Open this file in VS Code and use the Markdown preview (it renders Mermaid diagrams).
- Or paste the Mermaid block into the Mermaid Live Editor (https://mermaid.live) to export an SVG/PNG.

## Legend
- `Index` (`index.js`): public API and wiring
- `ServiceWorker` (`serviceWorker.js`): fetch handlers, install/activate, optional Background Sync
- `CacheManager` (`cacheManager.js`): Cache API helpers and strategies
- `Database` (`database.js`): IndexedDB/Dexie storage for queue and snapshots
- `SyncManager` (`syncManager.js`): queue processing, retry/backoff, Firebase integration
- `EventListeners` (`eventListeners.js`): online/offline/visibility handlers and internal event bus

## Notes and next steps
- I can export this diagram as an SVG and add it to the repo (e.g., `docs/offlineengine-flow.svg`).
- I can also embed the diagram inside `src/OfflineEngine/Architecture.md` if you'd like it consolidated.
