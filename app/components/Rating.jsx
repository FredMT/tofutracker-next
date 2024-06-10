'use client'
import React, { useState, useRef, useEffect } from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'

const Rating = ({
  precision = 1,
  totalStars = 5,
  value = -1,
  readOnly = false,
  onRatingChange,
  size = 2,
}) => {
  const [activeStar, setActiveStar] = useState(value)
  const [hoverActiveStar, setHoverActiveStar] = useState(-1)
  const [isHovered, setIsHovered] = useState(false)
  const ratingContainerRef = useRef(null)

  useEffect(() => {
    setActiveStar(value)
  }, [value])

  const calculateRating = (e) => {
    const { width, left } = ratingContainerRef.current.getBoundingClientRect()
    let percent = (e.clientX - left) / width
    const numberInStars = percent * totalStars
    const nearestNumber =
      Math.round((numberInStars + precision / 2) / precision) * precision

    return Number(
      nearestNumber.toFixed(precision.toString().split('.')[1]?.length || 0)
    )
  }

  const handleClick = (e) => {
    if (readOnly) return
    setIsHovered(false)
    setActiveStar(calculateRating(e))
    const newRating = calculateRating(e)

    if (onRatingChange) {
      onRatingChange(newRating) // Call the callback function with the new rating
    }
  }

  const handleMouseMove = (e) => {
    if (readOnly) return
    setIsHovered(true)
    setHoverActiveStar(calculateRating(e))
  }

  const handleMouseLeave = (e) => {
    if (readOnly) return
    setHoverActiveStar(-1)
    setIsHovered(false)
  }

  return (
    <div className="text-left">
      <div
        className={`relative inline-flex text-left ${
          readOnly ? '' : 'cursor-pointer'
        }`}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={ratingContainerRef}
      >
        {[...new Array(totalStars)].map((arr, index) => {
          const activeState = isHovered ? hoverActiveStar : activeStar

          const showEmptyIcon = activeState === -1 || activeState < index + 1

          const isActiveRating = activeState !== 1
          const isRatingWithPrecision = activeState % 1 !== 0
          const isRatingEqualToIndex = Math.ceil(activeState) === index + 1
          const showRatingWithPrecision =
            isActiveRating && isRatingWithPrecision && isRatingEqualToIndex

          return (
            <div
              className={`relative text-[30px] ${
                readOnly ? '' : 'cursor-pointer'
              }`}
              key={index}
            >
              <div
                className="absolute overflow-hidden"
                style={{
                  fontSize: `${size}rem`,
                  width: showRatingWithPrecision
                    ? `${(activeState % 1) * 100}%`
                    : '0%',
                  color: readOnly ? 'inherit' : 'yellow',
                }}
              >
                <FaStar />
              </div>
              <div
                style={{
                  fontSize: `${size}rem`,
                  color: showEmptyIcon
                    ? 'gray'
                    : readOnly
                      ? 'inherit'
                      : 'yellow',
                }}
              >
                {showEmptyIcon ? <FaRegStar /> : <FaStar />}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Rating
