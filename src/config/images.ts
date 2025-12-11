/**
 * 이미지 URL 설정 파일
 *
 * 구글 드라이브 사용 방법:
 * 1. 이미지를 구글 드라이브에 업로드
 * 2. 파일을 우클릭 > 공유 > "링크가 있는 모든 사용자" 설정
 * 3. 공유 링크에서 파일 ID 추출 (예: https://drive.google.com/file/d/FILE_ID/view)
 * 4. 아래 형식으로 URL 추가: `https://drive.google.com/uc?export=view&id=FILE_ID`
 *
 * 또는 다른 이미지 호스팅 서비스 사용:
 * - Imgur: https://imgur.com/upload 후 이미지 URL 복사
 * - Cloudinary: https://cloudinary.com
 * - GitHub: public 폴더에 이미지 업로드 후 raw.githubusercontent.com 사용
 */

/**
 * 구글 드라이브 링크에서 파일 ID를 추출하는 함수
 *
 * 지원하는 링크 형식:
 * - https://drive.google.com/file/d/FILE_ID/view
 * - https://drive.google.com/file/d/FILE_ID/view?usp=drive_link
 * - https://drive.google.com/uc?export=view&id=FILE_ID
 * - https://drive.google.com/drive/folders/FOLDER_ID
 *
 * @param driveLink 구글 드라이브 링크
 * @returns 파일 ID 또는 null (추출 실패 시)
 *
 * @example
 * extractFileId("https://drive.google.com/file/d/1gQT3xv9FB9PA1chVzvKju3tM5CrfTe4c/view?usp=drive_link")
 * // returns "1gQT3xv9FB9PA1chVzvKju3tM5CrfTe4c"
 */
export function extractFileId(driveLink: string): string | null {
  if (!driveLink || typeof driveLink !== "string") {
    return null;
  }

  // 이미 파일 ID만 있는 경우 (직접 이미지 URL 형식)
  // https://drive.google.com/uc?export=view&id=FILE_ID
  const ucMatch = driveLink.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (ucMatch) {
    return ucMatch[1];
  }

  // 파일 링크 형식: /file/d/FILE_ID
  const fileMatch = driveLink.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) {
    return fileMatch[1];
  }

  // 폴더 링크 형식: /folders/FOLDER_ID
  const folderMatch = driveLink.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  if (folderMatch) {
    return folderMatch[1];
  }

  // lh3.googleusercontent.com 형식: /d/FILE_ID
  const lh3Match = driveLink.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (lh3Match) {
    return lh3Match[1];
  }

  return null;
}

/**
 * 구글 드라이브 링크를 lh3.googleusercontent.com 형식의 이미지 URL로 변환하는 함수
 *
 * @param driveLink 구글 드라이브 링크
 * @returns lh3.googleusercontent.com 형식의 이미지 URL 또는 원본 링크 (변환 실패 시)
 *
 * @example
 * convertToDirectImageUrl("https://drive.google.com/file/d/1gQT3xv9FB9PA1chVzvKju3tM5CrfTe4c/view?usp=drive_link")
 * // returns "https://lh3.googleusercontent.com/d/1gQT3xv9FB9PA1chVzvKju3tM5CrfTe4c"
 */
export function convertToDirectImageUrl(driveLink: string): string {
  const fileId = extractFileId(driveLink);
  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  return driveLink; // 변환 실패 시 원본 반환
}

// 메인 이미지 URL
export const MAIN_IMAGE_URL = convertToDirectImageUrl(
  "https://drive.google.com/file/d/1MwPE_4a4P2X8_rocBQiKF5BAoo60Roxh/view?usp=drive_link"
);

// 갤러리 이미지 URL 배열
// 각 이미지의 구글 드라이브 파일 ID를 입력하세요
export const GALLERY_IMAGES = [
  {
    id: 1,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1YZFkb4D7DWbHBL9oaeSva9k0Gmo2bTVi/view?usp=drive_link"
    ),
    alt: "웨딩 사진 1",
  },
  {
    id: 2,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1ItPggI4l1mH_Hc41vmxTm6ICd0GhvOOC/view?usp=drive_link"
    ),
    alt: "웨딩 사진 2",
  },
  {
    id: 3,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1gQT3xv9FB9PA1chVzvKju3tM5CrfTe4c/view?usp=drive_link"
    ),
    alt: "웨딩 사진 3",
  },
  {
    id: 4,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1oG73_ojVUmT_hYRSnCgimpexTcDB2tsc/view?usp=drive_link"
    ),
    alt: "웨딩 사진 4",
  },
  {
    id: 5,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1zWMOsfN3oEQ5hKLnG-J7GN6u4f_hqocN/view?usp=drive_link"
    ),
    alt: "웨딩 사진 5",
  },
  {
    id: 6,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1LuJURrwd04u-eU799wiyOdo8D4gpmnl9/view?usp=drive_link"
    ),
    alt: "웨딩 사진 6",
  },
  {
    id: 7,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1kbn6SC1RLRDS43A-01xRs7fac8NGOUh1/view?usp=drive_link"
    ),
    alt: "웨딩 사진 7",
  },
  {
    id: 8,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1XONtVh1MI7CoBI1LCnymj2Hf5zYt6BDP/view?usp=drive_link"
    ),
    alt: "웨딩 사진 8",
  },
  {
    id: 9,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1MIzI82-OgQJeqhCi8K70n_LWOM_fm-HU/view?usp=drive_link"
    ),
    alt: "웨딩 사진 9",
  },
  {
    id: 10,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1AUwQU8D_sU8C6YiIjmejN3m1Xt0n0u6_/view?usp=drive_link"
    ),
    alt: "웨딩 사진 10",
  },
  {
    id: 11,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1pXipwTmO4X2IFN5ajIsrXwr6_JabgeB7/view?usp=drive_link"
    ),
    alt: "웨딩 사진 11",
  },
  {
    id: 12,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1WHZMW5Y-5X7uz_l3vL_MBkIXvXRfwL8b/view?usp=drive_link"
    ),
    alt: "웨딩 사진 12",
  },
  {
    id: 13,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1u1BraUO6bS-DwrKnF02tDYa-IocDkvSr/view?usp=drive_link"
    ),
    alt: "웨딩 사진 13",
  },
  {
    id: 14,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1I9khq0E7xyZitypzLRG5DTtDK_mAPmCc/view?usp=drive_link"
    ),
    alt: "웨딩 사진 14",
  },
  {
    id: 15,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1CVkgqjtN5JGbOe6BYdNCvg4QC-p4XPsn/view?usp=drive_link"
    ),
    alt: "웨딩 사진 15",
  },
  {
    id: 16,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1nVlgExEFfU1txQyuDT_Nj7TJnzMFX3zg/view?usp=drive_link"
    ),
    alt: "웨딩 사진 16",
  },
  {
    id: 17,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1uEIy6ZVF5KO7hSoCaA4UZ855dQLQj4dc/view?usp=drive_link"
    ),
    alt: "웨딩 사진 17",
  },
  {
    id: 18,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1yMpSB5hrC1rLD6_OfEbRNxPuxEEneAAO/view?usp=drive_link"
    ),
    alt: "웨딩 사진 18",
  },
  {
    id: 19,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1uNtl9Vb67kFmUAh_a5N_k7du2X4UJ5tw/view?usp=drive_link"
    ),
    alt: "웨딩 사진 19",
  },
  {
    id: 20,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1x467BvpPX2S40Cq5vkVcc96CAvYhqGtl/view?usp=drive_link"
    ),
    alt: "웨딩 사진 20",
  },
  {
    id: 21,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/16LTiWSWgf2_csUaHto2KjC7dYoayPuPy/view?usp=drive_link"
    ),
    alt: "웨딩 사진 21",
  },
  {
    id: 22,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1CuRKfcGTk_sLphcByqW5afvpaA_1yuza/view?usp=drive_link"
    ),
    alt: "웨딩 사진 22",
  },
  {
    id: 23,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1clEw9OEJFI3qZprGEY3iBmsQl4EN89hd/view?usp=drive_link"
    ),
    alt: "웨딩 사진 23",
  },
  {
    id: 24,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1al7Hs87GuNnud-RGEjNAUcNVmAeZMbZM/view?usp=sharing"
    ),
    alt: "웨딩 사진 24",
  },
  {
    id: 25,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1ukFanMQhH1mSZzRfQx9jwuPwIA1sBI9H/view?usp=drive_link"
    ),
    alt: "웨딩 사진 25",
  },
  {
    id: 26,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1LdYPKDzrN39HdAuYyhTzfzQ5i2rv7RMo/view?usp=drive_link"
    ),
    alt: "웨딩 사진 26",
  },
  {
    id: 27,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1xEF8oPHrpRLMmWRn_Fot6qmGUt9u4DfA/view?usp=drive_link"
    ),
    alt: "웨딩 사진 27",
  },
  {
    id: 28,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1JhKDbyLtqeVPWJlwnmKEWCnSqojBMrGD/view?usp=drive_link"
    ),
    alt: "웨딩 사진 28",
  },
  {
    id: 29,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1SrM1iuNbQdnXebUA4WX6NWNrYkFA-nLt/view?usp=drive_link"
    ),
    alt: "웨딩 사진 29",
  },
  {
    id: 30,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1vCp-ZJ8e6SEIp00bp09M1_L2bUDrP1kg/view?usp=drive_link"
    ),
    alt: "웨딩 사진 30",
  },
  {
    id: 31,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1u7VYMGgKs-YzxeVcM5NBy1C8GuAC3CXT/view?usp=drive_link"
    ),
    alt: "웨딩 사진 31",
  },
  {
    id: 32,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1MwPE_4a4P2X8_rocBQiKF5BAoo60Roxh/view?usp=drive_link"
    ),
    alt: "웨딩 사진 32",
  },
  {
    id: 33,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1bDaCoepz0s1pfGtp0L1QoQTsttdAzvP1/view?usp=drive_link"
    ),
    alt: "웨딩 사진 33",
  },
  {
    id: 34,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1vybh2AY9vJaabH1HVwarEuyAdRDY-TXP/view?usp=drive_link"
    ),
    alt: "웨딩 사진 34",
  },
  {
    id: 35,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1yAApc_KYmg7cJ5DNvSfSsVFO5QlMkYN6/view?usp=drive_link"
    ),
    alt: "웨딩 사진 35",
  },
  {
    id: 36,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1fOPsxe0fWCHy_5UiPMWwTJo8waaEzUSc/view?usp=drive_link"
    ),
    alt: "웨딩 사진 36",
  },
  {
    id: 37,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/16vM6XoojK5dqzou2Hwq6GntG0w3K6kyG/view?usp=drive_link"
    ),
    alt: "웨딩 사진 37",
  },
  {
    id: 38,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1QJ3_BY8i4GU0A5VZnLzQlU7zM1YT65Lp/view?usp=drive_link"
    ),
    alt: "웨딩 사진 38",
  },
  {
    id: 39,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1Lshb8UDpaA8ibEWEytUKr8-D-QnYKr3P/view?usp=drive_link"
    ),
    alt: "웨딩 사진 39",
  },
  {
    id: 40,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1fWC-wfUkVTK0rcGUyKTuxx-7KsIjp7Zy/view?usp=drive_link"
    ),
    alt: "웨딩 사진 40",
  },
  {
    id: 41,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1ggKc6_nL2uKTFm8SJwUM4LV41_iw-D8g/view?usp=drive_link"
    ),
    alt: "웨딩 사진 41",
  },
  {
    id: 42,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1jPaSaxVs85QcqvqhXgDpvxJt2R5bqCQx/view?usp=drive_link"
    ),
    alt: "웨딩 사진 42",
  },
  {
    id: 43,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1bLNFH_DVMGPjWd1e2IADEGnil72brRwN/view?usp=drive_link"
    ),
    alt: "웨딩 사진 43",
  },
  {
    id: 44,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/19fi8rM9ndDuGNgrDECHSB6k0BUUdd7D5/view?usp=drive_link"
    ),
    alt: "웨딩 사진 44",
  },
  {
    id: 45,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1RiSlqA-LlMm5ZfMQ2F3k_Ty0D3nygKIq/view?usp=drive_link"
    ),
    alt: "웨딩 사진 45",
  },
  {
    id: 46,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1ysRfk_7ij68hrd-RUVMqOJDwtovCrJGR/view?usp=drive_link"
    ),
    alt: "웨딩 사진 46",
  },
  {
    id: 47,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1DTajr_DAFB33qIar5VbIWU8_2h0UDEad/view?usp=drive_link"
    ),
    alt: "웨딩 사진 47",
  },
  {
    id: 48,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1xU3zTWf9QjzhZBMjF2Ji7JYUnA1VDD43/view?usp=drive_link"
    ),
    alt: "웨딩 사진 48",
  },
  {
    id: 49,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1SpOoDMqe-pqXM7O6wXoLWhIIW3fYBGqy/view?usp=drive_link"
    ),
    alt: "웨딩 사진 49",
  },
  {
    id: 50,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1fKwttpSawb1Q8P3bxaIUCKtu0jQJ7Nlp/view?usp=drive_link"
    ),
    alt: "웨딩 사진 50",
  },
  {
    id: 51,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1qX68NlEos0caUpy7-P4_-4S2amJs8Ps-/view?usp=drive_link"
    ),
    alt: "웨딩 사진 51",
  },
  {
    id: 52,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1jJfQaruaPmnXoMt8eIuF-Q7cFfYOkjLe/view?usp=drive_link"
    ),
    alt: "웨딩 사진 52",
  },
  {
    id: 53,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1i0U8PnuJwiwJ2HNlrpuNcx66cmlgUxCB/view?usp=drive_link"
    ),
    alt: "웨딩 사진 53",
  },
  {
    id: 54,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1ALU4U5y9YS5iCGMHefrjSAlMdUJRMU8l/view?usp=drive_link"
    ),
    alt: "웨딩 사진 54",
  },
  {
    id: 55,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1PhXNexa2QnsiMsfxixZzHdTsk8GifpWn/view?usp=drive_link"
    ),
    alt: "웨딩 사진 55",
  },
  {
    id: 56,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/13ikpBVaWGTu0MM1OHb91k2wTCm5RxAve/view?usp=drive_link"
    ),
    alt: "웨딩 사진 56",
  },
  {
    id: 57,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1_VrksgtSyenhxLJwtbO8B_6QC6jSK0VT/view?usp=drive_link"
    ),
    alt: "웨딩 사진 57",
  },
  {
    id: 58,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1PrDd71w41k7C_P9yBIXOWtBpPNlwTe6y/view?usp=drive_link"
    ),
    alt: "웨딩 사진 58",
  },
  {
    id: 59,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1y90DNZPtjypfN9oHLIfJS7e6_O-qQC4_/view?usp=drive_link"
    ),
    alt: "웨딩 사진 59",
  },
  {
    id: 60,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/10VpSTdUMj7koVO_FcMSPOjlptzOoQ_ot/view?usp=drive_link"
    ),
    alt: "웨딩 사진 60",
  },
  {
    id: 61,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1l9jkM7fYytWPf_SK7nSv8J73ybuNFauN/view?usp=drive_link"
    ),
    alt: "웨딩 사진 61",
  },
  {
    id: 62,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1sPaLUph8dPr-69mCXxkQGtB3LpHhhyQs/view?usp=drive_link"
    ),
    alt: "웨딩 사진 62",
  },
  {
    id: 63,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1S38EnB6_TvO3jw2Im2ZvBKtDPMy49dBz/view?usp=drive_link"
    ),
    alt: "웨딩 사진 63",
  },
  {
    id: 64,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1CM5wVPxzHCoTW5xpCFcjkqdV00Yda2_P/view?usp=drive_link"
    ),
    alt: "웨딩 사진 64",
  },
  {
    id: 65,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1keaYMqTDodLGoH8T6SBCU_nyM7CaF8r7/view?usp=drive_link"
    ),
    alt: "웨딩 사진 65",
  },
  {
    id: 66,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1l4ekAk2MSlwXZjyvOCGG5DPif5qCLGMs/view?usp=drive_link"
    ),
    alt: "웨딩 사진 66",
  },
  {
    id: 67,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1NOGXDtMlQRfgW5lLwcHGWi1GY0xkQEHB/view?usp=drive_link"
    ),
    alt: "웨딩 사진 67",
  },
  {
    id: 68,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1JljYovao1uLott0coq_A5G0ORsWE1J_w/view?usp=drive_link"
    ),
    alt: "웨딩 사진 68",
  },
  {
    id: 69,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1UIMUc2h4x7-PTyhwkbd3dAt_AxnqpVlg/view?usp=drive_link"
    ),
    alt: "웨딩 사진 69",
  },
  {
    id: 70,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/13Q21ZTqaanjVBCPFTuF-D7jGBpdvUYKl/view?usp=drive_link"
    ),
    alt: "웨딩 사진 70",
  },
  {
    id: 71,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/116ng10_TZwP1WqkEOfUZM-EcPiMY2JrZ/view?usp=drive_link"
    ),
    alt: "웨딩 사진 71",
  },
  {
    id: 72,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1WYmLgbRbJe6bD1et05Wlk7PTEY-kw-0d/view?usp=drive_link"
    ),
    alt: "웨딩 사진 72",
  },
  {
    id: 73,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1dWyGoOkScmwiATa2CO_Sh9tzVS-CMG9z/view?usp=drive_link"
    ),
    alt: "웨딩 사진 73",
  },
  {
    id: 74,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/12wBt0ctXWhYjXqK_2k85R9ACQZ4J9ul2/view?usp=sharing"
    ),
    alt: "웨딩 사진 74",
  },
  {
    id: 75,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1Xcqkufv5plnHYw_-q_ln5yk-EGL9vNkN/view?usp=drive_link"
    ),
    alt: "웨딩 사진 75",
  },
  {
    id: 76,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1eVyZq1zU7_Oi5vvOV_kU7ZfpJypS6TMb/view?usp=drive_link"
    ),
    alt: "웨딩 사진 76",
  },
  {
    id: 77,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1mO0gUlVnKGVGYXlFUGMw12Y-Gw_0GX7A/view?usp=drive_link"
    ),
    alt: "웨딩 사진 77",
  },
  {
    id: 78,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1-bJgOISOnllr-qKs8wFMqVKz5zqE3mfl/view?usp=drive_link"
    ),
    alt: "웨딩 사진 78",
  },
  {
    id: 79,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1-WCv9JSFKe-SleyJgweOZH_kwgiPfS6P/view?usp=drive_link"
    ),
    alt: "웨딩 사진 79",
  },
  {
    id: 80,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/16ZhufRz3dHn1gHHAq22e75sJ81Ij-3QY/view?usp=drive_link"
    ),
    alt: "웨딩 사진 80",
  },
  {
    id: 81,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1YyxkWe-WBiHGnFSoGyi5tbtFMJSVYQhY/view?usp=drive_link"
    ),
    alt: "웨딩 사진 81",
  },
  {
    id: 82,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/14BXw4KzgsQkm-Uuf13q89eGaW_-CSoyM/view?usp=drive_link"
    ),
    alt: "웨딩 사진 82",
  },
  {
    id: 83,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1W4cOuy814ecyLsCgnevpj1poustC48hk/view?usp=drive_link"
    ),
    alt: "웨딩 사진 83",
  },
  {
    id: 84,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1Tqbjub_RZnu_ALlCU0ss2X-o8PYN5mTS/view?usp=drive_link"
    ),
    alt: "웨딩 사진 84",
  },
  {
    id: 85,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1VMu4I0p32sFRx02nVUeVCPdU17e1at-Y/view?usp=drive_link"
    ),
    alt: "웨딩 사진 85",
  },
  {
    id: 86,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1cDosJSo5Dl-sOSATP8ECeLuIdIWOmsSa/view?usp=drive_link"
    ),
    alt: "웨딩 사진 86",
  },
  {
    id: 87,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/15MLzdsZiHzRPfsxRLkF55XzqrpvdVJ_h/view?usp=drive_link"
    ),
    alt: "웨딩 사진 87",
  },
  {
    id: 88,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/13K3WyM0aYByYp8Iy8aaxypyeIuRW3zXS/view?usp=drive_link"
    ),
    alt: "웨딩 사진 88",
  },
  {
    id: 89,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1GTAD_R1zenzlOgflMeyrzsYsbasGTquW/view?usp=drive_link"
    ),
    alt: "웨딩 사진 89",
  },
  {
    id: 90,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1WI65SdqFHIiezXxUMiYawOb6iH0ThG8t/view?usp=drive_link"
    ),
    alt: "웨딩 사진 90",
  },
  {
    id: 91,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/1eQA2iReg5Uu1XzKSqNX6vSarKYUiFe7Y/view?usp=drive_link"
    ),
    alt: "웨딩 사진 91",
  },
  {
    id: 92,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/15IsahY_I2UjTKwyxg2cbmluR08ryqMHn/view?usp=drive_link"
    ),
    alt: "웨딩 사진 92",
  },
  {
    id: 93,
    url: convertToDirectImageUrl(
      "https://drive.google.com/file/d/17Rnh5xvhqPMGRa-h-6J4ctAztIPv6mfC/view?usp=drive_link"
    ),
    alt: "웨딩 사진 93",
  },
];
