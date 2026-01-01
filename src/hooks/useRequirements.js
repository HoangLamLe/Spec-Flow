import { useState, useEffect, useMemo, useCallback } from "react";
import {
  getRequirements,
  createRequirement,
  updateRequirement,
  deleteRequirement,
  generateAcceptanceCriteria,
} from "../services/api";

export default function useRequirements() {
  const [requirements, setRequirements] = useState([]);
  const [selectedRequirementId, setSelectedRequirementId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [acceptanceCriteria, setAcceptanceCriteria] = useState(null);

  const fetchRequirements = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRequirements();
      setRequirements(data);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequirements();
  }, []);

  const select = useCallback((id) => {
    setTimeout(() => {
      setSelectedRequirementId(id);
    }, 100);
    setAcceptanceCriteria(null);
  }, []);

  const create = useCallback(async () => {
    setSaving(true);
    try {
      const newReq = await createRequirement({
        title: "New Requirement",
        description: "",
        status: "Draft",
      });
      setRequirements((prev) => [...prev, newReq]);
      setSelectedRequirementId(newReq.id);
      return newReq;
    } catch (err) {
      console.error("Failed to create requirement:", err);
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  const update = useCallback(async (id, data) => {
    setSaving(true);
    try {
      const updated = await updateRequirement(id, data);
      setRequirements((prev) => prev.map((req) => (req.id === id ? updated : req)));
      return updated;
    } catch (err) {
      setError(err.message || String(err));
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  const remove = useCallback(async (id) => {
    setSaving(true);
    try {
      await deleteRequirement(id);
      setRequirements((prev) => prev.filter((req) => req.id !== id));
      if (selectedRequirementId === id) {
        setSelectedRequirementId(null);
      }
    } catch (err) {
      setError(err.message || String(err));
      throw err;
    } finally {
      setSaving(false);
    }
  }, [selectedRequirementId]);

  const generateAI = useCallback(async (id) => {
    setGenerating(true);
    try {
      const criteria = await generateAcceptanceCriteria(id);
      setAcceptanceCriteria(criteria);
      setGenerating(false);
      return criteria;
    } catch (err) {
      setError(err.message || String(err));
      setGenerating(false);
      throw err;
    }
  }, []);

  const close = useCallback(() => {
    setSelectedRequirementId(null);
    setAcceptanceCriteria(null);
  }, []);

  const selectedRequirement = useMemo(
    () => requirements.find((req) => req.id === selectedRequirementId),
    [requirements, selectedRequirementId]
  );

  return useMemo(
    () => ({
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
    }),
    [
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
    ]
  );
}
