import { useState, useEffect } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

interface ProtectedLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  projectTitle: string;
}

// 비밀번호를 변경하려면 src/config.ts의 protectedPassword를 수정하세요
import { profile } from "../../config";
const PASSWORD_HASH = (profile as any).protectedPassword ?? "1234";

export function ProtectedLinkModal({
  isOpen,
  onClose,
  onSuccess,
  projectTitle
}: ProtectedLinkModalProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setPassword("");
      setError("");
      setShowPassword(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate async validation
    setTimeout(() => {
      if (password === PASSWORD_HASH) {
        // Store authentication in session storage
        sessionStorage.setItem("portfolio_auth", "true");
        sessionStorage.setItem("portfolio_auth_time", Date.now().toString());
        onSuccess();
        onClose();
      } else {
        setError("비밀번호가 올바르지 않습니다.");
      }
      setIsLoading(false);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Lock className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              프로젝트 접근 인증
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {projectTitle}
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-yellow-800">
            💡 이 프로젝트는 유료 API를 사용합니다. 데모를 보시려면 비밀번호를 입력해주세요.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              비밀번호
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className={`w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  error ? "border-red-300" : "border-gray-300"
                }`}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              disabled={isLoading}
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!password || isLoading}
              className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "확인 중..." : "확인"}
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-4 text-center">
          비밀번호는 포트폴리오 공유 시 별도로 안내드립니다.
        </p>
      </div>
    </div>
  );
}
