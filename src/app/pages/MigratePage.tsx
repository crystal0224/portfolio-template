import { useState } from 'react';
import { migrateAllData } from '../scripts/migrateToFirebase';

export function MigratePage() {
  const [status, setStatus] = useState<'idle' | 'migrating' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleMigrate = async () => {
    setStatus('migrating');
    setMessage('마이그레이션 진행 중... Firebase 콘솔을 열어서 확인하세요.');

    try {
      await migrateAllData();
      setStatus('success');
      setMessage('✅ 마이그레이션 완료! Firebase 콘솔에서 데이터를 확인하세요.');
    } catch (error) {
      setStatus('error');
      setMessage(`❌ 마이그레이션 실패: ${error instanceof Error ? error.message : String(error)}`);
      console.error('Migration error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Firebase 데이터 마이그레이션
        </h1>

        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800">
            ⚠️ <strong>주의:</strong> 이 작업은 <strong>한 번만</strong> 실행하세요.
            기존 Firebase 데이터가 있다면 덮어씌워집니다.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">마이그레이션 내용:</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>포트폴리오 항목 35개</li>
            <li>경력 (Experience)</li>
            <li>학력 (Education)</li>
            <li>자격증 (Certifications)</li>
            <li>출판 (Publications)</li>
            <li>스킬 (Skills)</li>
            <li>수상 (Awards)</li>
            <li>학술 프로젝트 (Academic Projects)</li>
            <li>강의 (Teaching)</li>
            <li>아르바이트 (Part-time Jobs)</li>
            <li>동아리 (Group Activities)</li>
            <li>멘토링 (Mentoring)</li>
            <li>연구 교류 (Research Exchange)</li>
            <li>업무 프로젝트 (Work Projects)</li>
          </ul>
        </div>

        <button
          onClick={handleMigrate}
          disabled={status === 'migrating' || status === 'success'}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
            status === 'migrating'
              ? 'bg-gray-400 cursor-not-allowed'
              : status === 'success'
              ? 'bg-green-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {status === 'migrating'
            ? '마이그레이션 진행 중...'
            : status === 'success'
            ? '✓ 마이그레이션 완료'
            : '마이그레이션 시작'}
        </button>

        {message && (
          <div
            className={`mt-4 p-4 rounded ${
              status === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : status === 'error'
                ? 'bg-red-50 text-red-800 border border-red-200'
                : 'bg-blue-50 text-blue-800 border border-blue-200'
            }`}
          >
            <p className="whitespace-pre-wrap">{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="mt-6 p-4 bg-gray-50 rounded">
            <h3 className="font-semibold mb-2">다음 단계:</h3>
            <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
              <li>
                <a
                  href="https://console.firebase.google.com/project/portfolio-b1f6d/firestore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Firebase 콘솔
                </a>
                에서 데이터 확인
              </li>
              <li>메인 페이지로 돌아가서 편집 테스트</li>
              <li>이 마이그레이션 페이지는 삭제해도 됩니다</li>
            </ol>
          </div>
        )}

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-blue-600 hover:underline text-sm"
          >
            ← 메인 페이지로 돌아가기
          </a>
        </div>
      </div>
    </div>
  );
}
