import { useState } from "react";

function VersionHistoryPanel({ versions, onRestore, onCommit }) {
  const [showCommitConfirm, setShowCommitConfirm] = useState(false);

  const handleCommitVersion = () => {
    onCommit();
    setShowCommitConfirm(false);
  };

  const handleRestore = (version) => {
    if (
      window.confirm(
        `Are you sure you want to restore to the version from ${new Date(
          version.timestamp
        ).toLocaleString()}?`
      )
    ) {
      onRestore(version);
    }
  };

  return (
    <div className="mt-6 border-t border-gray-200 pt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Version History</h3>
        <button
          onClick={() => setShowCommitConfirm(true)}
          className="px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          📸 Commit Version
        </button>
      </div>

      {showCommitConfirm && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-900 mb-3">
            Create a new version snapshot of the current title and description?
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleCommitVersion}
              className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowCommitConfirm(false)}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {versions.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-500 text-sm">
            No version history yet. Click "Commit Version" to create a snapshot.
          </p>
        </div>
      ) : (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {versions.map((version, index) => {
            const isLatest = index === versions.length - 1;

            return (
              <div
                key={version.id}
                className={`p-3 rounded-md border ${
                  isLatest
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-600">
                        v{index + 1}
                      </span>
                      {isLatest && (
                        <span className="inline-block px-2 py-1 bg-green-600 text-white text-xs font-medium rounded">
                          Latest
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(version.timestamp).toLocaleString()}
                    </p>
                    <p className="text-sm font-medium text-gray-900 mt-1 truncate">
                      {version.title}
                    </p>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {version.description}
                    </p>
                  </div>

                  {isLatest && (
                    <button
                      onClick={() => handleRestore(version)}
                      className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 whitespace-nowrap flex-shrink-0"
                    >
                      Restore
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {versions.length > 0 && (
        <p className="text-xs text-gray-500 mt-3">
          Total versions: {versions.length}
        </p>
      )}
    </div>
  );
}

export default VersionHistoryPanel;
