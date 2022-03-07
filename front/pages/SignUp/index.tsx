import React, {useCallback, useState} from 'react';
import {Button, Error, Form, Header, Input, Label, LinkContainer, Success} from "@pages/style";
import {Link, Redirect} from 'react-router-dom';
import useInput from '@hooks/useInput';
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import axios from "axios";
import logo from "@utils/logo.png";

const SignUp = () => {
    const {data, error, mutate} = useSWR('http://localhost:1010/auth/', fetcher);
    console.log("!!! = ", data);
    const [email, onChangeEmail] = useInput('');
    const [name, onChangeName] = useInput('');
    const [nick, onChangeNickname] = useInput('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [mismatchError, setMismatchError] = useState(false);
    const [signUpError, setSignUpError] = useState('');
    const [signUpSuccess, setSignUpSuccess] = useState(false);

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
        setMismatchError(e.target.value !== passwordCheck);
    },[passwordCheck]);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setMismatchError(e.target.value !== password);
    }, [password]);
    console.log("mis", mismatchError);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if (!mismatchError) {
            console.log('회원가입');
            setSignUpError(''); // 비동기 요청 전 초기화
            setSignUpSuccess(false); // 비동기 요청 전 초기화
            axios.post('http://localhost:1010/auth/signup', {
                email,
                name,
                nick,
                password,
            })
                .then((response) => {
                    console.log(response);
                    setSignUpSuccess(true);
                })
                .catch((error) => {
                    console.log(error.response);
                    setSignUpError(error.response.data);
                })
                .finally(() => {});
        }
    },[email, nick, password, passwordCheck]);

    if (data === undefined) {
        return <div>로딩중...</div>
    }

    if (data) {
        return <Redirect to="/main" />
    }

    return (
        <div id="container">
            <Header>
                <img src={logo}/>
            </Header>
            <Form onSubmit={onSubmit}>
                <Label id="email-label">
                    <span>이메일 주소</span>
                    <div>
                        <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
                    </div>
                </Label>
                <Label id="name-label">
                    <span>이름</span>
                    <div>
                        <Input type="text" id="name" name="name" value={name} onChange={onChangeName} />
                    </div>
                </Label>
                <Label id="nickname-label">
                    <span>닉네임</span>
                    <div>
                        <Input type="text" id="nickname" name="nick" value={nick} onChange={onChangeNickname} />
                    </div>
                </Label>
                <Label id="password-label">
                    <span>비밀번호</span>
                    <div>
                        <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
                    </div>
                </Label>
                <Label id="password-check-label">
                    <span>비밀번호 확인</span>
                    <div>
                        <Input
                            type="password"
                            id="password-check"
                            name="password-check"
                            value={passwordCheck}
                            onChange={onChangePasswordCheck}
                        />
                    </div>
                    {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
                    {!nick && <Error>닉네임을 입력해주세요.</Error>}
                    {signUpError && <Error>{signUpError}</Error>}n
                    {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
                </Label>
                <Button type="submit">회원가입</Button>
            </Form>
            <LinkContainer>
                이미 회원이신가요?&nbsp;
                <Link to="/login">로그인 하러가기</Link>
            </LinkContainer>
        </div>
    );
}

export default SignUp;