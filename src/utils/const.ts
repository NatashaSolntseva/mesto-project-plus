export const COMMON_ERROR_STATUS_CODE = 500;
export const COMMON_ERROR_TEXT = 'На сервере произошла ошибка';
export const NOT_FOUND_CARD_ERROR_TEXT = 'Запрашиваемая карточка не найдена';
export const NOT_FOUND_USER_ERROR_TEXT = 'Запрашиваемый пользователь не найден';
export const FORBIDDEN_ERROR_TEXT = 'Не достаточно прав для совершения действия';
export const CAST_ERROR_TEXT = 'Передан некорректный id';
export const CONFLICT_ERROR_TEXT = 'Пользователь с таким email уже зарегистрирован';

export const PictureUrlPattern = /^(http[s]?:\/\/(www\.)?|ftp:\/\/(www\.)?|www\.){1}([0-9A-Za-z-\.@:%_\+~#=]+)+((\.[a-zA-Z]{2,3})+)(\/(.)*)?(\?(.)*)?/; //eslint-disable-line
export const IdStringPattern = /^[a-fA-F0-9]/;
