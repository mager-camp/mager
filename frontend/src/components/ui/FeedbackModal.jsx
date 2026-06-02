import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  AlertTriangle,
  X,
} from "lucide-react";

export default function FeedbackModal({
  open,
  type = "success",
  title,
  message,
  onClose,
}) {
  const isSuccess = type === "success";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/40 backdrop-blur-sm
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="
              relative
              w-[340px]
              rounded-[28px]
              bg-[#E8EEF5]
              px-8 py-10
              shadow-2xl
            "
            initial={{
              scale: 0.8,
              opacity: 0,
              y: 30,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0.9,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="
                absolute right-5 top-5
                text-slate-600
                hover:text-slate-900
              "
            >
              <X size={24} />
            </button>

            {/* Animated Icon */}
            <div className="flex justify-center">
              <motion.div
                className={`
                  flex items-center justify-center
                  w-16 h-16 rounded-full border-4
                  ${
                    isSuccess
                      ? "border-green-500"
                      : "border-orange-500"
                  }
                `}
                initial={{
                  scale: 0,
                  rotate: -180,
                }}
                animate={{
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                }}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.3,
                    duration: 0.3,
                  }}
                >
                  {isSuccess ? (
                    <Check
                      size={30}
                      className="text-green-500"
                    />
                  ) : (
                    <AlertTriangle
                      size={30}
                      className="text-orange-500"
                    />
                  )}
                </motion.div>
              </motion.div>
            </div>

            {/* Title */}
            <motion.h2
              className={`
                text-center mt-5
                text-4xl font-black
                ${
                  isSuccess
                    ? "text-green-500"
                    : "text-orange-500"
                }
              `}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4,
              }}
            >
              {title}
            </motion.h2>

            {/* Message */}
            <motion.p
              className="
                text-center mt-4
                text-sm font-medium
                text-slate-700
              "
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.5,
              }}
            >
              {message}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}