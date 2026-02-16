import { useState } from "react";
import { RefreshCw, Check, X, Github, ExternalLink } from "lucide-react";

interface NewProject {
  id: string;
  title: string;
  platform: string;
  url: string;
  description?: string;
  updatedAt: string;
}

interface SyncProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSync: () => Promise<NewProject[]>;
  onAdd: (projects: NewProject[]) => void;
}

export function SyncProjectsModal({
  isOpen,
  onClose,
  onSync,
  onAdd
}: SyncProjectsModalProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [newProjects, setNewProjects] = useState<NewProject[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [scanComplete, setScanComplete] = useState(false);

  useState(() => {
    const lastSync = localStorage.getItem("portfolio_last_sync");
    if (lastSync) {
      const date = new Date(parseInt(lastSync));
      setLastSyncTime(date.toLocaleString("ko-KR"));
    }
  });

  const handleScan = async () => {
    setIsScanning(true);
    setScanComplete(false);
    setNewProjects([]);
    setSelectedIds(new Set());

    try {
      const projects = await onSync();
      setNewProjects(projects);
      // Auto-select all
      setSelectedIds(new Set(projects.map(p => p.id)));
      setScanComplete(true);
    } catch (error) {
      console.error("Sync failed:", error);
    } finally {
      setIsScanning(false);
    }
  };

  const handleToggle = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const handleAdd = () => {
    const selected = newProjects.filter(p => selectedIds.has(p.id));
    onAdd(selected);

    // Update last sync time
    localStorage.setItem("portfolio_last_sync", Date.now().toString());

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <RefreshCw className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                프로젝트 동기화
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                GitHub, HuggingFace, Vercel의 새 프로젝트를 자동으로 감지합니다
              </p>
              {lastSyncTime && (
                <p className="text-xs text-gray-500 mt-1">
                  마지막 동기화: {lastSyncTime}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!scanComplete && !isScanning && (
            <div className="text-center py-12">
              <div className="inline-flex p-4 rounded-full bg-blue-100 mb-4">
                <RefreshCw className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                프로젝트 스캔 시작
              </h4>
              <p className="text-sm text-gray-600 mb-6">
                모든 플랫폼에서 새 프로젝트를 검색합니다
              </p>
              <button
                onClick={handleScan}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
              >
                <RefreshCw className="w-4 h-4" />
                스캔 시작
              </button>
            </div>
          )}

          {isScanning && (
            <div className="text-center py-12">
              <div className="inline-flex p-4 rounded-full bg-blue-100 mb-4">
                <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                스캔 중...
              </h4>
              <p className="text-sm text-gray-600">
                GitHub, HuggingFace, Vercel을 확인하고 있습니다
              </p>
            </div>
          )}

          {scanComplete && newProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex p-4 rounded-full bg-green-100 mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                모든 프로젝트가 최신입니다
              </h4>
              <p className="text-sm text-gray-600">
                새로운 프로젝트가 발견되지 않았습니다
              </p>
            </div>
          )}

          {scanComplete && newProjects.length > 0 && (
            <div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  ✨ <strong>{newProjects.length}개</strong>의 새 프로젝트를 발견했습니다!
                </p>
              </div>

              <div className="space-y-3">
                {newProjects.map((project) => (
                  <div
                    key={project.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedIds.has(project.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleToggle(project.id)}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(project.id)}
                        onChange={() => handleToggle(project.id)}
                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-semibold text-gray-900">{project.title}</h5>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {project.platform}
                          </span>
                        </div>
                        {project.description && (
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {project.description}
                          </p>
                        )}
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>업데이트: {new Date(project.updatedAt).toLocaleDateString("ko-KR")}</span>
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-3 h-3" />
                            보기
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {scanComplete && newProjects.length > 0 && (
          <div className="flex items-center justify-between gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600">
              {selectedIds.size}개 선택됨
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleAdd}
                disabled={selectedIds.size === 0}
                className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                {selectedIds.size}개 추가
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
