"use client";

import React, { useState } from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckIcon from '@mui/icons-material/Check';

const STICKERS = [
  { id: 1, src: "/parent stickers/sticker 1.png", name: "Sticker 1" },
  { id: 2, src: "/parent stickers/sticker 2.png", name: "Sticker 2" },
  { id: 3, src: "/parent stickers/sticker 3.png", name: "Sticker 3" },
  { id: 4, src: "/parent stickers/sticker 4.png", name: "Sticker 4" },
  { id: 5, src: "/parent stickers/sticker 5.png", name: "Sticker 5" },
  { id: 6, src: "/parent stickers/sticker 6.png", name: "Sticker 6" },
  { id: 7, src: "/parent stickers/sticker 7.png", name: "Sticker 7" },
  { id: 8, src: "/parent stickers/sticker 8.png", name: "Sticker 8" },
  { id: 9, src: "/parent stickers/sticker 9.png", name: "Sticker 9" },
  { id: 10, src: "/parent stickers/mission parental support.png", name: "Parental Support" },
  { id: 11, src: "/parent stickers/parental support 2.png", name: "Parental Support 2" },
  { id: 12, src: "/parent stickers/parental support.png", name: "Parental Support 3" },
  { id: 13, src: "/parent stickers/solo master.png", name: "Solo Master" },
];

interface MissionItemProps {
  taskName: string;
  submittedTime: string;
  acceptLabel: string;
  redoLabel: string;
}

export default function ParentMissionCard({
  taskName,
  submittedTime,
  acceptLabel,
  redoLabel,
}: MissionItemProps) {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);

  const handleAcceptClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmAward = () => {
    setIsAccepted(true);
    setIsModalOpen(false);
  };

  return (
    <div className='w-full h-auto bg-white border-bright-purple py-5 border-4 rounded-3xl flex flex-col items-center gap-5'>
      <div>
        <p className='text-center font-black text-lg text-black'>{taskName}</p>
        <p className='text-center font-black text-[15px] text-black/40'>{submittedTime}</p>
      </div>

      <div className='border-5 border-sunny-yellow w-[95%] aspect-video rounded-3xl flex justify-center items-center relative overflow-hidden'>
        <PlayArrowIcon className="text-white bg-sunny-yellow rounded-full p-2 border-4 border-white shadow-sm" sx={{ fontSize: 70 }} />
      </div>

      {isAccepted ? (
        <div className="w-[95%] flex flex-col items-center gap-2 p-3 bg-mint-green/10 border-2 border-mint-green rounded-2xl">
          <div className="flex items-center gap-2 text-mint-green font-bold text-lg">
            <CheckIcon /> Accepted & Sticker Awarded!
          </div>
          {selectedSticker && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">Given Sticker:</span>
              <img src={selectedSticker} alt="Awarded Sticker" className="w-14 h-14 object-contain" />
            </div>
          )}
        </div>
      ) : (
        <div className='w-[95%] h-16 gap-7 border-black flex flex-row items-center'>
          <button
            onClick={handleAcceptClick}
            className='w-[45%] h-full bg-mint-green flex items-center justify-center rounded-2xl border-black border-2 cursor-pointer hover:opacity-90 transition-opacity'
          >
            <p className='text-white font-black text-xl'>{acceptLabel}</p>
          </button>
          <button className='w-[45%] h-full bg-red-500 flex items-center justify-center rounded-2xl border-black border-2 cursor-pointer hover:opacity-90 transition-opacity'>
            <p className='text-white font-black text-xl'>{redoLabel}</p>
          </button>
        </div>
      )}

      {/* Sticker Selector Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full flex flex-col items-center gap-5 max-h-[85vh] overflow-y-auto border-4 border-bright-purple shadow-2xl">
            <h2 className="text-2xl font-black text-bright-purple text-center">
              Reward Your Child with a Sticker! 🌟
            </h2>
            <p className="text-sm text-gray-600 text-center font-medium">
              Select a sticker to award upon accepting this mission:
            </p>

            {/* Grid of stickers */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 w-full p-2">
              {STICKERS.map((sticker) => {
                const isSelected = selectedSticker === sticker.src;
                return (
                  <button
                    key={sticker.id}
                    type="button"
                    onClick={() => setSelectedSticker(sticker.src)}
                    className={`flex flex-col items-center p-2 rounded-2xl border-3 transition-all cursor-pointer ${
                      isSelected
                        ? "border-sunny-yellow bg-sunny-yellow/20 scale-105 shadow-md"
                        : "border-gray-200 hover:border-bright-purple/50 bg-gray-50"
                    }`}
                  >
                    <img
                      src={sticker.src}
                      alt={sticker.name}
                      className="w-16 h-16 object-contain"
                    />
                  </button>
                );
              })}
            </div>

            <div className="flex gap-4 w-full justify-center mt-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 rounded-full border-2 border-gray-400 font-bold text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAward}
                disabled={!selectedSticker}
                className={`px-8 py-2.5 rounded-full border-2 font-bold text-white transition-all ${
                  selectedSticker
                    ? "bg-mint-green border-black cursor-pointer shadow-lg hover:scale-105"
                    : "bg-gray-300 border-gray-400 cursor-not-allowed opacity-60"
                }`}
              >
                Accept & Give Sticker
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
