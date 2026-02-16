"use client";

import { useState, useEffect, useCallback } from "react";
import { Edit3, Plus, Save, X, Trash2 } from "lucide-react";
import type { FieldConfig } from "../../config/careerFieldConfigs";

export interface BaseCareerEditModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  item?: T;
  fieldConfig: FieldConfig[];
  onSave: (data: T) => Promise<void> | void;
  onDelete?: (id: string) => void;
  title: string;
  itemId?: string;
}

export function BaseCareerEditModal<T extends Record<string, unknown>>({
  isOpen,
  onClose,
  item,
  fieldConfig,
  onSave,
  onDelete,
  title,
  itemId,
}: BaseCareerEditModalProps<T>) {
  const isEditMode = item !== undefined;
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (item) {
        // Edit mode: populate with existing data
        const data: Record<string, unknown> = {};
        fieldConfig.forEach((field) => {
          data[field.name] = (item as Record<string, unknown>)[field.name] ?? "";
        });
        setFormData(data);
      } else {
        // Add mode: empty form
        const data: Record<string, unknown> = {};
        fieldConfig.forEach((field) => {
          data[field.name] = "";
        });
        setFormData(data);
      }
      setErrors({});
      setShowDeleteConfirm(false);
    }
  }, [isOpen, item, fieldConfig]);

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    fieldConfig.forEach((field) => {
      const value = formData[field.name];
      // Required validation
      if (field.required) {
        if (value === undefined || value === null || String(value).trim() === "") {
          newErrors[field.name] = "필수 항목입니다";
        }
      }
      // Number validation
      if (field.type === "number" && value !== "" && value !== undefined) {
        if (isNaN(Number(value))) {
          newErrors[field.name] = "숫자를 입력해주세요";
        }
      }
    });

    // Date range validation: check if startDate < endDate
    const startField = fieldConfig.find(
      (f) => f.name === "startDate" || f.name === "startYear"
    );
    const endField = fieldConfig.find(
      (f) => f.name === "endDate" || f.name === "endYear"
    );
    if (startField && endField) {
      const startVal = formData[startField.name];
      const endVal = formData[endField.name];
      if (startVal && endVal && String(startVal) > String(endVal)) {
        newErrors[endField.name] = "종료일은 시작일 이후여야 합니다";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, fieldConfig]);

  const handleSave = async () => {
    if (!validate()) return;

    setIsSaving(true);
    try {
      // Convert number fields
      const processedData: Record<string, unknown> = { ...formData };
      fieldConfig.forEach((field) => {
        if (field.type === "number" && processedData[field.name] !== "") {
          processedData[field.name] = Number(processedData[field.name]);
        }
        // Convert empty strings to null for optional fields (Firebase doesn't accept undefined)
        if (!field.required && processedData[field.name] === "") {
          processedData[field.name] = null;
        }
      });

      // Remove undefined values (Firebase doesn't accept undefined)
      Object.keys(processedData).forEach(key => {
        if (processedData[key] === undefined) {
          delete processedData[key];
        }
      });

      console.log('💾 Saving data:', processedData);
      await onSave(processedData as T);
      console.log('✅ Save successful');
      onClose();
    } catch (error) {
      console.error("❌ Save failed:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(`저장에 실패했습니다.\n${errorMessage}\n\n콘솔을 확인해주세요.`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (onDelete && itemId) {
      try {
        console.log('🗑️ Deleting item:', itemId);
        await onDelete(itemId);
        console.log('✅ Delete successful');
        onClose();
        setShowDeleteConfirm(false);
      } catch (error) {
        console.error("❌ Delete failed:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        alert(`삭제에 실패했습니다.\n${errorMessage}`);
      }
    }
  };

  const handleFieldChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const renderField = (field: FieldConfig) => {
    const value = formData[field.name] ?? "";
    const error = errors[field.name];
    const inputClasses = `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      error ? "border-red-300" : "border-gray-300"
    }`;

    switch (field.type) {
      case "textarea":
        return (
          <textarea
            value={String(value)}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            rows={3}
            className={`${inputClasses} resize-none`}
          />
        );
      case "select":
        return (
          <select
            value={String(value)}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className={inputClasses}
          >
            <option value="">선택해주세요</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "month":
        return (
          <input
            type="month"
            value={String(value)}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className={inputClasses}
          />
        );
      case "date":
        return (
          <input
            type="date"
            value={String(value)}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className={inputClasses}
          />
        );
      case "number":
        return (
          <input
            type="number"
            value={String(value)}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className={inputClasses}
          />
        );
      default:
        return (
          <input
            type="text"
            value={String(value)}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className={inputClasses}
          />
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${isEditMode ? "bg-blue-100" : "bg-green-100"}`}>
              {isEditMode ? (
                <Edit3 className="w-5 h-5 text-blue-600" />
              ) : (
                <Plus className="w-5 h-5 text-green-600" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {fieldConfig.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {renderField(field)}
              {errors[field.name] && (
                <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-6 mt-6 border-t border-gray-200">
          {isEditMode && onDelete && itemId && (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              삭제
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "저장 중..." : isEditMode ? "저장" : "추가"}
          </button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">항목 삭제</h4>
                <p className="text-sm text-gray-600 mt-1">정말로 이 항목을 삭제하시겠습니까?</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
