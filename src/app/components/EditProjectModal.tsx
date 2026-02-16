import { useState, useEffect } from "react";
import { Edit3, Save, X } from "lucide-react";
import { PortfolioItem } from "./PortfolioCard";

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: PortfolioItem;
  onSave: (updatedProject: PortfolioItem) => void;
}

export function EditProjectModal({
  isOpen,
  onClose,
  project,
  onSave
}: EditProjectModalProps) {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [tags, setTags] = useState(project.tags.join(", "));
  const [isProtected, setIsProtected] = useState(project.protected || false);

  useEffect(() => {
    if (isOpen) {
      setTitle(project.title);
      setDescription(project.description);
      setTags(project.tags.join(", "));
      setIsProtected(project.protected || false);
    }
  }, [isOpen, project]);

  const handleSave = () => {
    const updatedProject: PortfolioItem = {
      ...project,
      title: title.trim(),
      description: description.trim(),
      tags: tags.split(",").map(t => t.trim()).filter(t => t),
      protected: isProtected,
    };
    onSave(updatedProject);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Edit3 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                프로젝트 편집
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {project.platform} · {project.id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설명
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              {description.length} 자
            </p>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              태그 (쉼표로 구분)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Python, AI, Data Analysis"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Protected */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              id="protected"
              checked={isProtected}
              onChange={(e) => setIsProtected(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="protected" className="flex-1 text-sm text-gray-700">
              <span className="font-medium">비밀번호 보호</span>
              <br />
              <span className="text-gray-500">유료 API를 사용하는 프로젝트는 비밀번호로 보호합니다</span>
            </label>
          </div>
        </div>

        {/* Info */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
          <p className="text-sm text-yellow-800">
            💡 변경사항은 LocalStorage에 저장되며, 실제 파일은 수정되지 않습니다.
            영구적으로 적용하려면 코드를 직접 수정해야 합니다.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-6 mt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
