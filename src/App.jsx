import RequirementList from "./components/RequirementList";
import RequirementDetail from "./components/RequirementDetail";
import useRequirements from "./hooks/useRequirements";

function App() {
  const {
    requirements,
    selectedRequirementId,
    selectedRequirement,
    loading,
    error,
    saving,
    generating,
    acceptanceCriteria,
    fetchRequirements,
    select,
    create,
    update,
    remove,
    generateAI,
    close,
  } = useRequirements();

  return (
    <div
      className="h-screen flex bg-gray-100"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div
        className="w-1/2 h-full"
        style={{ position: "relative", zIndex: 100 }}
      >
        <RequirementList
          requirements={requirements}
          selectedId={selectedRequirementId}
          onSelect={select}
          onCreate={create}
          loading={loading}
          error={error}
          onRetry={fetchRequirements}
        />
      </div>
      <RequirementDetail
        requirement={selectedRequirement}
        onUpdate={update}
        onDelete={remove}
        onGenerateAI={generateAI}
        onClose={close}
        saving={saving}
        generating={generating}
        acceptanceCriteria={acceptanceCriteria}
      />
    </div>
  );
}

export default App;
