import Data from '../components/data/contactList';
import ConversionData from '../components/Chat/chatPanel/data/conversationList';

const iState = {
    list: Data,
    ConversionDataList: ConversionData,
    MessageData: [],
};

const reducer = (state = iState, action) => {
    switch (action.type) {
        case "pushList":
            return {
                "MessageData": state.MessageData,
                "ConversionDataList": state.ConversionDataList,
                "list": [...state.list, {
                    id: (state.list.length === 0) ? 1 : state.list[state.list.length - 1].id + 1,
                    name: action.payload.name, phone: (action.payload.phone),
                    address: action.payload.address, company: action.payload.company, email: action.payload.email
                }]
            };
        case "deleteListById":
            let result = Object.entries(action.payload.id);
            let array = result.map((val) => {
                return val[0]
            });

            // filter array with array of object
            return {
                "list": state.list.filter(f => !array.includes(f.id.toString())),
                "MessageData": state.MessageData,
                "ConversionDataList": state.ConversionDataList
            };
        case "editListById":
            // eslint-disable-next-line
            const editedValue = state.list.map(item => {
                if (item.id === action.payload.id) {
                    // eslint-disable-next-line
                    item.name = action.payload.name, item.phone = action.payload.phone,
                        item.address = action.payload.address, item.company = action.payload.company,
                        item.email = action.payload.email
                    return item;
                }
                else
                    return item;
            });
            break;
        case "searchData":
            let filteredData = ''
            if (action.payload.searchInput) {
                filteredData = state.list.filter(value => {
                    return value.name
                        .toString()
                        .toLowerCase()
                        .includes(action.payload.searchInput.toLowerCase())
                })
                return {
                    "list": filteredData,
                    "MessageData": state.MessageData,
                    "ConversionDataList": state.ConversionDataList,
                }
            }
            else {
                return {
                    "list": Data,
                    "MessageData": state.MessageData,
                    "ConversionDataList": state.ConversionDataList
                }
            }
        case "addChatmsg":

            const addMsg = state.ConversionDataList.map(item => {
                if (item.id === action.payload.id) {
                    let t = [...item.conversationData, {
                        'type': 'sent', 'message': action.payload.message, 'sentAt': new Date().toLocaleTimeString()
                    }]
                    let t1 = { id: item.id, conversationData: t }
                    return t1
                }
                else
                    return item
            });
            return {
                "ConversionDataList": addMsg,
                "list": state.list,
                "MessageData": state.MessageData
            }

        case "addMessageData":
            let chatData = state.ConversionDataList.filter((val) => val.id === action.payload.id);
            let newmsg = chatData[0].conversationData;
            return {
                "ConversionDataList": state.ConversionDataList,
                "list": state.list,
                "MessageData": newmsg
            }

        default:
            return state;
    }
}

export default reducer;