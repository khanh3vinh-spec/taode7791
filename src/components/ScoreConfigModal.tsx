import React, { useState } from 'react';
import { ScoreConfig, DEFAULT_SCORE_CONFIG } from '../types/matrix';
import { Settings, X, Check, RotateCcw } from 'lucide-react';

interface ScoreConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ScoreConfig;
  onSaveConfig: (newConfig: ScoreConfig) => void;
}

export const ScoreConfigModal: React.FC<ScoreConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [localConfig, setLocalConfig] = useState<ScoreConfig>({ ...config });

  if (!isOpen) return null;

  const totalPoints =
    localConfig.scoreNhieuLuaChon +
    localConfig.scoreDungSai +
    (localConfig.includeTraLoiNgan ? localConfig.scoreTraLoiNgan : 0) +
    localConfig.scoreTuLuan;

  const handleApplyPreset = (preset: 'TOAN_2_1' | 'CV7991_GOC' | 'TN7_TL3' | 'TN100' | 'KHTN_4_6') => {
    if (preset === 'KHTN_4_6') {
      setLocalConfig({
        scoreNhieuLuaChon: 4.0,
        scoreDungSai: 0.0,
        scoreTraLoiNgan: 0.0,
        scoreTuLuan: 6.0,
        includeTraLoiNgan: false,
        targetBietPercent: 40,
        targetHieuPercent: 30,
        targetVanDungPercent: 20,
        targetVanDungCaoPercent: 10,
      });
    } else if (preset === 'TOAN_2_1') {
      setLocalConfig({
        scoreNhieuLuaChon: 2.0,
        scoreDungSai: 1.0,
        scoreTraLoiNgan: 0.0,
        scoreTuLuan: 7.0,
        includeTraLoiNgan: false,
        targetBietPercent: 40,
        targetHieuPercent: 30,
        targetVanDungPercent: 30,
      });
    } else if (preset === 'CV7991_GOC') {
      setLocalConfig({
        scoreNhieuLuaChon: 3.0,
        scoreDungSai: 2.0,
        scoreTraLoiNgan: 2.0,
        scoreTuLuan: 3.0,
        includeTraLoiNgan: true,
        targetBietPercent: 40,
        targetHieuPercent: 30,
        targetVanDungPercent: 30,
      });
    } else if (preset === 'TN7_TL3') {
      setLocalConfig({
        scoreNhieuLuaChon: 2.0,
        scoreDungSai: 1.0,
        scoreTraLoiNgan: 0.0,
        scoreTuLuan: 7.0,
        includeTraLoiNgan: false,
        targetBietPercent: 40,
        targetHieuPercent: 30,
        targetVanDungPercent: 30,
      });
    } else if (preset === 'TN100') {
      setLocalConfig({
        scoreNhieuLuaChon: 4.0,
        scoreDungSai: 3.0,
        scoreTraLoiNgan: 3.0,
        scoreTuLuan: 0.0,
        includeTraLoiNgan: true,
        targetBietPercent: 40,
        targetHieuPercent: 30,
        targetVanDungPercent: 30,
      });
    }
  };

  const handleSave = () => {
    onSaveConfig(localConfig);
    onClose();
  };

  const handleReset = () => {
    setLocalConfig({ ...DEFAULT_SCORE_CONFIG });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/80 backdrop-blur-md">
      <div className="bg-blue-900 border border-blue-600 rounded-2xl shadow-2xl max-w-lg w-full text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-blue-950 to-blue-900 border-b border-blue-700/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Settings className="w-5 h-5 text-amber-300" />
            <h3 className="font-black text-white uppercase tracking-wide text-sm sm:text-base">
              CẤU HÌNH THANG ĐIỂM & TỈ LỆ MA TRẬN
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-blue-300 hover:text-white hover:bg-blue-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs sm:text-sm">
          {/* Quick presets */}
          <div>
            <label className="text-[11px] font-bold text-amber-300 uppercase block mb-1.5">
              Mẫu thang điểm định sẵn:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <button
                type="button"
                onClick={() => handleApplyPreset('TOAN_2_1')}
                className="p-2 rounded-lg bg-blue-950 border border-blue-700 hover:border-amber-400 text-blue-100 hover:text-white font-medium text-xs text-center transition-colors cursor-pointer shadow-sm"
              >
                Môn Toán (2đ - 1đ - 7đ)
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('KHTN_4_6')}
                className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-500/80 hover:border-amber-400 text-emerald-200 hover:text-white font-bold text-xs text-center transition-colors cursor-pointer shadow-sm"
              >
                KHTN Ngãi Tứ (TN 4đ - TL 6đ)
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('CV7991_GOC')}
                className="p-2 rounded-lg bg-blue-950 border border-blue-700 hover:border-amber-400 text-blue-100 hover:text-white font-medium text-xs text-center transition-colors cursor-pointer"
              >
                Gốc CV 7991 (3 - 2 - 2 - 3)
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('TN7_TL3')}
                className="p-2 rounded-lg bg-blue-950 border border-blue-700 hover:border-amber-400 text-blue-100 hover:text-white font-medium text-xs text-center transition-colors cursor-pointer"
              >
                TN 3đ - TL 7đ
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('TN100')}
                className="p-2 rounded-lg bg-blue-950 border border-blue-700 hover:border-amber-400 text-blue-100 hover:text-white font-medium text-xs text-center transition-colors cursor-pointer"
              >
                100% Trắc nghiệm (10đ)
              </button>
            </div>
          </div>

          {/* Form fields for scores */}
          <div className="p-3 bg-blue-950/70 rounded-xl border border-blue-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-blue-200">
                1. Phần I: TN Nhiều lựa chọn (điểm)
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="10"
                value={localConfig.scoreNhieuLuaChon}
                onChange={(e) =>
                  setLocalConfig({
                    ...localConfig,
                    scoreNhieuLuaChon: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-20 px-2 py-1 bg-blue-900 border border-blue-700 rounded text-center text-white font-bold"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-blue-200">
                2. Phần II: TN Đúng – Sai (điểm)
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="10"
                value={localConfig.scoreDungSai}
                onChange={(e) =>
                  setLocalConfig({
                    ...localConfig,
                    scoreDungSai: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-20 px-2 py-1 bg-blue-900 border border-blue-700 rounded text-center text-white font-bold"
              />
            </div>

            <div className="flex items-center justify-between text-xs p-2 bg-blue-900/40 rounded-lg border border-blue-800">
              <div>
                <label className="font-semibold text-blue-200 block">
                  3. Phần III: TN Trả lời ngắn
                </label>
                <span className="text-[11px] text-blue-300">
                  {localConfig.includeTraLoiNgan
                    ? 'Đang bật'
                    : 'Đã bỏ theo quy định môn Toán (chuyển 7,0đ cho Tự luận)'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setLocalConfig({
                      ...localConfig,
                      includeTraLoiNgan: !localConfig.includeTraLoiNgan,
                      scoreTraLoiNgan: !localConfig.includeTraLoiNgan ? 2.0 : 0.0,
                      scoreTuLuan: !localConfig.includeTraLoiNgan ? 5.0 : 7.0,
                    })
                  }
                  className={`px-2.5 py-1 rounded text-[11px] font-bold border transition-colors cursor-pointer ${
                    localConfig.includeTraLoiNgan
                      ? 'bg-blue-600 text-white border-blue-400'
                      : 'bg-rose-950/80 text-rose-300 border-rose-800'
                  }`}
                >
                  {localConfig.includeTraLoiNgan ? 'Bật (2.0đ)' : 'Đã bỏ (0.0đ)'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-blue-200">
                4. Phần IV: Tự luận (điểm)
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="10"
                value={localConfig.scoreTuLuan}
                onChange={(e) =>
                  setLocalConfig({
                    ...localConfig,
                    scoreTuLuan: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-20 px-2 py-1 bg-blue-900 border border-blue-700 rounded text-center text-white font-bold"
              />
            </div>

            <div className="pt-2 border-t border-blue-800 flex items-center justify-between font-bold text-sm">
              <span className="text-amber-300">Tổng điểm bài thi:</span>
              <span
                className={`font-mono text-base ${
                  Math.abs(totalPoints - 10) < 0.01 ? 'text-emerald-400' : 'text-amber-300'
                }`}
              >
                {totalPoints.toFixed(1)} điểm
              </span>
            </div>
          </div>

          <div className="text-[11px] text-blue-300 italic">
            * Phân bổ điểm môn Toán: TN Nhiều lựa chọn 2,0 điểm (20%), TN Đúng – Sai 1,0 điểm (10%), TN Trả lời ngắn 2,0 điểm (20%), Tự luận 5,0 điểm (50%) - Tổng 10,0 điểm.
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-blue-950 to-blue-900 border-t border-blue-700/80 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 bg-blue-950 text-blue-300 hover:text-white rounded text-xs flex items-center gap-1 border border-blue-800 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mặc định CV 7991</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Áp dụng thang điểm</span>
          </button>
        </div>
      </div>
    </div>
  );
};
