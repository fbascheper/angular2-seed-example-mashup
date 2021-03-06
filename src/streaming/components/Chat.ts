import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {MessageBroker} from '../../services/MessageBroker';
import {Authentication} from '../../services/Authentication';
import {IRegisteredUser} from '../../../common/interfaces/RegistrationInterfaces';
import {IChatMessage} from '../../../common/interfaces/ChatInterfaces';

@Component({
    selector: 'chat',
    templateUrl: './streaming/components/Chat.html',
    styleUrls: ['./streaming/components/Chat.css'],
    pipes: [],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class Chat {

    user: IRegisteredUser;
    message: string = '';
    thread: IChatMessage[] = [];

    constructor(public messaageBroker:MessageBroker, public authentication:Authentication) {
        if (!this.authentication.authenticate()) {
            return;
        }

        this.user = this.authentication.user;
        this.messaageBroker.getChatMessages()
            .subscribe((msg:IChatMessage) => this.thread.unshift(msg));
    }

    sendMessage(msg:string) {
        if (msg) {
            this.messaageBroker.sendChatMessage({
                username: this.user.username,
                time: new Date(),
                message: msg
            });
        }

        this.message = '';
    }
}
