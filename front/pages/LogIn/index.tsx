import React, {useState, useCallback} from 'react';
import { Link } from 'react-router-dom';
import {Button, Form, Header, Input, Label, LinkContainer} from '@pages/style';
import useInput from "@hooks/useInput";

const LogIn = () => {
    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');

    return (
        <div id="container">
            <Header>
                <img src="utils/logoImage2.png"/>
            </Header>
            {/*<Form onSubmit={onSubmit}>*/}
            <Form>
                <Label id="email-label">
                    <span>이메일 주소</span>
                    <div>
                        {/*<Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />*/}
                        <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
                    </div>
                </Label>
                <Label id="password-label">
                    <span>비밀번호</span>
                    <div>
                        {/*<Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />*/}
                        <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
                    </div>
                    {/*{logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}*/}
                </Label>
                <Button type="submit">로그인</Button>
            </Form>
            <LinkContainer>
                아직 회원이 아니신가요?&nbsp;
                <Link to="/signup">회원가입 하러가기</Link>
            </LinkContainer>
        </div>
    );
}

export default LogIn;