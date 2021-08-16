import React, {useState, useCallback} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Button, Error, Form, Header, Input, Label, LinkContainer} from '@pages/style';
import useInput from "@hooks/useInput";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import axios from "axios";

const LogIn = () => {
    const {data, error, revalidate} = useSWR('http://localhost:1010/auth/', fetcher);
    console.log("@@@ = ", data);

    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [logInError, setLogInError] = useState(false);

    const onSubmit = useCallback((e) => {
            e.preventDefault();
            setLogInError(false);
            axios
                .post(
                    'http://localhost:1010/auth/login',
                    {email, password},
                    {
                        withCredentials: true,
                    },
                )
                .then(() => {
                    revalidate();
                })
                .catch((error) => {
                    setLogInError(error.response?.data?.statusCode === 401);
                });
        },
        [email, password]
    );

    if (data) {
        return <Redirect to="/main" />
    }

    return (
        <div id="container">
            <Header>
                <img src='./utils/logo.png' />
            </Header>
            <Form onSubmit={onSubmit}>
                <Label id="email-label">
                    <span>이메일 주소</span>
                    <div>
                        <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
                    </div>
                </Label>
                <Label id="password-label">
                    <span>비밀번호</span>
                    <div>
                        <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
                    </div>
                    {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
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