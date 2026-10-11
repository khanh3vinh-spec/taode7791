import React, { useState } from 'react';
import {
  QuestionItem,
  CognitiveLevel,
  PartType,
  MathCompetencyCode,
  MATH_COMPETENCIES,
  SubjectId,
  getSubjectById,
} from '../types/matrix';
import { Plus, Trash2, Edit3, Check, X, Search, Sparkles } from 'lucide-react';

interface QuestionManagerProps {
  questions: QuestionItem[];
  onUpdateQuestions: (updated: QuestionItem[]) => void;
  selectedQuestionId?: string | null;
  currentSubjectId?: SubjectId;
}

export const QuestionManager: React.FC<QuestionManagerProps> = ({
  questions,
  onUpdateQuestions,
  selectedQuestionId,
  currentSubjectId = 'toan',
}) => {
  const [filterPart, setFilterPart] = useState<string>('ALL');
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [filterComp, setFilterComp] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [editingId, setEditingId] = useState<string | null>(selectedQuestionId || null);
  const [editForm, setEditForm] = useState<Partial<QuestionItem>>({});

  const subDef = getSubjectById(currentSubjectId);
  const isKHTN = currentSubjectId === 'khtn' || subDef.id === 'khtn';
  const availableCompetencies = Object.values(subDef.competencies);

  const startEdit = (q: QuestionItem) => {
    setEditingId(q.id);
    setEditForm({ ...q });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    if (!editingId) return;
    const updated = questions.map((q) => {
      if (q.id === editingId) {
        return {
          ...q,
          ...editForm,
        } as QuestionItem;
      }
      return q;
    });
    onUpdateQuestions(updated);
    setEditingId(null);
    setEditForm({});
  };

  const handleQuickLevelChange = (id: string, newLevel: CognitiveLevel) => {
    const updated = questions.map((q) => (q.id === id ? { ...q, level: newLevel } : q));
    onUpdateQuestions(updated);
  };

  const handleQuickCompetencyChange = (id: string, newComp: MathCompetencyCode) => {
    const updated = questions.map((q) => (q.id === id ? { ...q, competency: newComp } : q));
    onUpdateQuestions(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xoá câu hỏi này khỏi ma trận?')) {
      const updated = questions.filter((q) => q.id !== id);
      onUpdateQuestions(updated);
    }
  };

  const handleAddNewQuestion = () => {
    const newQ: QuestionItem = {
      id: 'q_' + Date.now(),
      questionNumber: `Câu ${questions.length + 1}`,
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Hàm số và đồ thị',
      subTopic: 'Tính đơn điệu của hàm số',
      level: 'BIET',
      competency: 'NLTD & LLTH',
      contentSnippet: 'Nội dung câu hỏi mới...',
      expectedOutcome: 'Nhận biết được tính đơn điệu của hàm số.',
      score: 0.25,
    };
    onUpdateQuestions([...questions, newQ]);
    startEdit(newQ);
  };

  const filteredQuestions = questions.filter((q) => {
    if (filterPart !== 'ALL' && q.partType !== filterPart) return false;
    if (filterLevel !== 'ALL' && q.level !== filterLevel) return false;
    if (filterComp !== 'ALL' && q.competency !== filterComp) return false;
    if (searchQuery.trim()) {
      const term = searchQuery.toLowerCase();
      const matchNum = q.questionNumber.toLowerCase().includes(term);
      const matchTopic = q.topic.toLowerCase().includes(term);
      const matchSub = q.subTopic.toLowerCase().includes(term);
      const matchContent = (q.contentSnippet || '').toLowerCase().includes(term);
      if (!matchNum && !matchTopic && !matchSub && !matchContent) return false;
    }
    return true;
  });

  return (
    <div className="bg-blue-900/60 backdrop-blur-md rounded-2xl border border-blue-700/50 p-4 sm:p-6 shadow-2xl">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="text-lg font-black text-white uppercase tracking-wide flex items-center gap-2">
            <span>Danh sách Câu hỏi & Gán Năng lực Toán học</span>
            <span className="text-xs bg-blue-800 text-blue-200 px-2 py-0.5 rounded-full border border-blue-600 font-semibold">
              {questions.length} câu
            </span>
          </h2>
          <p className="text-xs text-blue-200 mt-0.5">
            Giáo viên có thể thay đổi nhanh Mức độ nhận thức (Biết / Hiểu / Vận dụng) và 1 trong 5 Năng lực Toán học cho từng câu.
          </p>
        </div>

        <button
          onClick={handleAddNewQuestion}
          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md border border-emerald-400/40 transition-all self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm câu hỏi mới</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-5 p-3 bg-blue-950/70 rounded-xl border border-blue-800/80 text-xs">
        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-blue-400" />
          <input
            type="text"
            placeholder="Tìm theo số câu, chủ đề..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-blue-900/60 border border-blue-700 rounded-lg text-white placeholder-blue-400 focus:outline-none focus:border-blue-400 text-xs"
          />
        </div>

        {/* Filter Part */}
        <div>
          <select
            value={filterPart}
            onChange={(e) => setFilterPart(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-blue-900/60 border border-blue-700 rounded-lg text-white focus:outline-none focus:border-blue-400 text-xs"
          >
            <option value="ALL">Mọi phần câu hỏi (Tất cả)</option>
            <option value="TN_NHIEU_LUA_CHON">Phần I: TN Nhiều lựa chọn</option>
            <option value="TN_DUNG_SAI">Phần II: TN Đúng - Sai</option>
            <option value="TN_TRA_LOI_NGAN">Phần III: TN Trả lời ngắn</option>
            <option value="TU_LUAN">Phần IV: Tự luận</option>
          </select>
        </div>

        {/* Filter Level */}
        <div>
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-blue-900/60 border border-blue-700 rounded-lg text-white focus:outline-none focus:border-blue-400 text-xs"
          >
            <option value="ALL">Mọi mức độ nhận thức</option>
            <option value="BIET">Biết (Nhận biết)</option>
            <option value="HIEU">Hiểu (Thông hiểu)</option>
            <option value="VAN_DUNG">Vận dụng</option>
          </select>
        </div>

        {/* Filter Competency */}
        {!isKHTN ? (
          <div>
            <select
              value={filterComp}
              onChange={(e) => setFilterComp(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-blue-900/60 border border-blue-700 rounded-lg text-white focus:outline-none focus:border-blue-400 text-xs"
            >
              <option value="ALL">Mọi năng lực chuyên môn</option>
              {availableCompetencies.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} - {c.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="flex items-center h-full px-2.5 py-1.5 bg-blue-900/40 border border-blue-800 rounded-lg text-xs text-amber-300/80 font-medium italic">
            🔬 Môn KHTN: Không gắn mã năng lực
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-10 text-blue-300 bg-blue-950/40 rounded-xl border border-dashed border-blue-800">
            Không tìm thấy câu hỏi nào phù hợp với bộ lọc hiện tại.
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isEditing = editingId === q.id;
            const comp = MATH_COMPETENCIES[q.competency] || {
              name: q.competency,
              badgeBg: 'bg-blue-600/30 text-white',
              badgeBorder: 'border-blue-400',
            };

            return (
              <div
                key={q.id}
                className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                  isEditing
                    ? 'bg-blue-950 border-amber-400/80 shadow-xl ring-2 ring-amber-400/20'
                    : 'bg-blue-950/60 hover:bg-blue-950/90 border-blue-800/80 hover:border-blue-700 shadow-md'
                }`}
              >
                {isEditing ? (
                  /* Edit Mode Form */
                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className={`grid grid-cols-1 ${isKHTN ? 'sm:grid-cols-4' : 'sm:grid-cols-5'} gap-2.5`}>
                      <div>
                        <label className="text-[11px] font-bold text-blue-300 block mb-1">
                          Số câu
                        </label>
                        <input
                          type="text"
                          value={editForm.questionNumber || ''}
                          onChange={(e) =>
                            setEditForm({ ...editForm, questionNumber: e.target.value })
                          }
                          className="w-full px-2.5 py-1.5 bg-blue-900/80 border border-blue-700 rounded text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-blue-300 block mb-1">
                          Phần / Dạng câu
                        </label>
                        <select
                          value={editForm.partType || 'TN_NHIEU_LUA_CHON'}
                          onChange={(e) =>
                            setEditForm({ ...editForm, partType: e.target.value as PartType })
                          }
                          className="w-full px-2.5 py-1.5 bg-blue-900/80 border border-blue-700 rounded text-white"
                        >
                          <option value="TN_NHIEU_LUA_CHON">TN Nhiều lựa chọn</option>
                          <option value="TN_DUNG_SAI">TN Đúng - Sai</option>
                          <option value="TN_TRA_LOI_NGAN">TN Trả lời ngắn</option>
                          <option value="TU_LUAN">Tự luận</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-amber-300 block mb-1">
                          Điểm số (đ)
                        </label>
                        <input
                          type="number"
                          step="0.25"
                          min="0"
                          max="10"
                          value={editForm.score !== undefined ? editForm.score : ''}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setEditForm({ ...editForm, score: isNaN(val) ? undefined : val });
                          }}
                          placeholder={editForm.partType === 'TU_LUAN' ? '1.0' : '0.25'}
                          className="w-full px-2.5 py-1.5 bg-amber-950/70 border border-amber-500/80 rounded text-amber-200 font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-blue-300 block mb-1">
                          Mức độ nhận thức
                        </label>
                        <select
                          value={editForm.level || 'BIET'}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              level: e.target.value as CognitiveLevel,
                            })
                          }
                          className="w-full px-2.5 py-1.5 bg-blue-900/80 border border-blue-700 rounded text-white font-bold"
                        >
                          <option value="BIET" className="text-emerald-400">
                            Biết (Nhận biết)
                          </option>
                          <option value="HIEU" className="text-amber-400">
                            Hiểu (Thông hiểu)
                          </option>
                          <option value="VAN_DUNG" className="text-rose-400">
                            Vận dụng
                          </option>
                        </select>
                      </div>

                      {!isKHTN && (
                        <div>
                          <label className="text-[11px] font-bold text-blue-300 block mb-1">
                            Năng lực (CV 7991)
                          </label>
                          <select
                            value={editForm.competency || availableCompetencies[0]?.code}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                competency: e.target.value as MathCompetencyCode,
                              })
                            }
                            className="w-full px-2.5 py-1.5 bg-blue-900/80 border border-blue-700 rounded text-white font-bold"
                          >
                            {availableCompetencies.map((c) => (
                              <option key={c.code} value={c.code}>
                                {c.code} - {c.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[11px] font-bold text-blue-300 block mb-1">
                          Chủ đề / Chương
                        </label>
                        <input
                          type="text"
                          value={editForm.topic || ''}
                          onChange={(e) =>
                            setEditForm({ ...editForm, topic: e.target.value })
                          }
                          className="w-full px-2.5 py-1.5 bg-blue-900/80 border border-blue-700 rounded text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-blue-300 block mb-1">
                          Nội dung / đơn vị kiến thức
                        </label>
                        <input
                          type="text"
                          value={editForm.subTopic || ''}
                          onChange={(e) =>
                            setEditForm({ ...editForm, subTopic: e.target.value })
                          }
                          className="w-full px-2.5 py-1.5 bg-blue-900/80 border border-blue-700 rounded text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-blue-300 block mb-1">
                        Yêu cầu cần đạt chuẩn GDPT 2018
                      </label>
                      <input
                        type="text"
                        value={editForm.expectedOutcome || ''}
                        onChange={(e) =>
                          setEditForm({ ...editForm, expectedOutcome: e.target.value })
                        }
                        className="w-full px-2.5 py-1.5 bg-blue-900/80 border border-blue-700 rounded text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-blue-300 block mb-1">
                        Toàn văn câu hỏi gốc & các phương án lựa chọn (A, B, C, D hoặc a, b, c, d)
                      </label>
                      <textarea
                        rows={3}
                        value={editForm.fullQuestionText || editForm.contentSnippet || ''}
                        onChange={(e) =>
                          setEditForm({ ...editForm, fullQuestionText: e.target.value })
                        }
                        className="w-full px-2.5 py-1.5 bg-blue-900/80 border border-blue-700 rounded text-white text-xs font-mono resize-y"
                        placeholder="Nhập toàn văn đề bài và các phương án..."
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-blue-300 block mb-1">
                        Tóm tắt nội dung câu hỏi
                      </label>
                      <textarea
                        rows={2}
                        value={editForm.contentSnippet || ''}
                        onChange={(e) =>
                          setEditForm({ ...editForm, contentSnippet: e.target.value })
                        }
                        className="w-full px-2.5 py-1.5 bg-blue-900/80 border border-blue-700 rounded text-white resize-none"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        onClick={cancelEdit}
                        className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded font-medium text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Huỷ</span>
                      </button>
                      <button
                        onClick={saveEdit}
                        className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Lưu thay đổi</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* View Mode with Quick Action Selectors */
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 text-xs">
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center flex-wrap gap-2">
                        <span className="font-black text-sm text-white bg-blue-900 px-2 py-0.5 rounded border border-blue-700">
                          {q.questionNumber}
                        </span>

                        <span className="text-blue-300 font-semibold bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                          {q.partType === 'TN_NHIEU_LUA_CHON'
                            ? 'Nhiều lựa chọn'
                            : q.partType === 'TN_DUNG_SAI'
                            ? 'Đúng – Sai'
                            : q.partType === 'TN_TRA_LOI_NGAN'
                            ? 'Trả lời ngắn'
                            : 'Tự luận'}
                        </span>

                        {/* Direct Score Badge */}
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-extrabold border ${
                            q.partType === 'TU_LUAN'
                              ? 'bg-amber-500/25 text-amber-200 border-amber-400/50 shadow-sm'
                              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          }`}
                          title={
                            q.partType === 'TU_LUAN'
                              ? 'Điểm số của câu tự luận này lấy trực tiếp vào khung ma trận'
                              : 'Điểm số của câu hỏi'
                          }
                        >
                          {typeof q.score === 'number'
                            ? `${q.score.toString().replace('.', ',')} điểm`
                            : q.partType === 'TU_LUAN'
                            ? 'Chưa đặt điểm'
                            : '0,25 điểm'}
                        </span>

                        {/* Quick Level Selector Buttons */}
                        <div className="inline-flex rounded-lg border border-blue-700/80 bg-blue-900/40 p-0.5">
                          <button
                            onClick={() => handleQuickLevelChange(q.id, 'BIET')}
                            className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                              q.level === 'BIET'
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'text-blue-300 hover:text-white'
                            }`}
                            title="Chuyển mức độ: Biết"
                          >
                            Biết
                          </button>
                          <button
                            onClick={() => handleQuickLevelChange(q.id, 'HIEU')}
                            className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                              q.level === 'HIEU'
                                ? 'bg-amber-600 text-white shadow-sm'
                                : 'text-blue-300 hover:text-white'
                            }`}
                            title="Chuyển mức độ: Hiểu"
                          >
                            Hiểu
                          </button>
                          <button
                            onClick={() => handleQuickLevelChange(q.id, 'VAN_DUNG')}
                            className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                              q.level === 'VAN_DUNG'
                                ? 'bg-rose-600 text-white shadow-sm'
                                : 'text-blue-300 hover:text-white'
                            }`}
                            title="Chuyển mức độ: Vận dụng"
                          >
                            Vận dụng
                          </button>
                        </div>

                        {/* Competency Badge & Quick Selector (hidden for KHTN) */}
                        {!isKHTN && (
                          <div className="relative group">
                            <select
                              value={q.competency}
                              onChange={(e) =>
                                handleQuickCompetencyChange(
                                  q.id,
                                  e.target.value as MathCompetencyCode
                                )
                              }
                              className={`px-2 py-0.5 rounded border font-bold text-[11px] cursor-pointer ${comp.badgeBg} ${comp.badgeBorder} focus:outline-none`}
                              title="Nhấp để thay đổi năng lực chuyên môn"
                            >
                              {availableCompetencies.map((c) => (
                                <option
                                  key={c.code}
                                  value={c.code}
                                  className="bg-blue-950 text-white"
                                >
                                  {c.code} - {c.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>

                      <div className="text-blue-200">
                        <span className="font-bold text-white">{q.topic}</span>
                        <span className="mx-1 text-blue-400">›</span>
                        <span className="font-medium text-blue-100">{q.subTopic}</span>
                      </div>

                      {q.expectedOutcome && (
                        <div className="text-[12px] text-blue-100/90 bg-blue-900/30 p-2 rounded-lg border border-blue-800/60">
                          <span className="font-bold text-amber-300">Chuẩn KTKN: </span>
                          {q.expectedOutcome}
                        </div>
                      )}

                      {(q.fullQuestionText || q.contentSnippet) && (
                        <div className="text-[12px] text-blue-200/90 bg-blue-950/40 p-2 rounded border border-blue-800/40 line-clamp-3 font-mono whitespace-pre-wrap">
                          {q.fullQuestionText || q.contentSnippet}
                        </div>
                      )}
                    </div>

                    <div className="flex md:flex-col items-center gap-1.5 self-end md:self-center">
                      <button
                        onClick={() => startEdit(q)}
                        className="p-1.5 bg-blue-800 hover:bg-blue-700 text-blue-200 hover:text-white rounded border border-blue-700 transition-colors cursor-pointer"
                        title="Chỉnh sửa chi tiết"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(q.id)}
                        className="p-1.5 bg-rose-950/60 hover:bg-rose-900 text-rose-300 hover:text-rose-100 rounded border border-rose-800/60 transition-colors cursor-pointer"
                        title="Xoá câu hỏi"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
